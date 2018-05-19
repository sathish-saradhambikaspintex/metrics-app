import { range } from "ramda";

export default class SizeAndPositionManager {
	// Cache of size and position data for cells, mapped by cell index.
	// Note that invalid values may exist in this map so only rely on cells up to this._lastMeasuredIndex
	_cellSizeAndPositionData = {};

	// Measurements for cells up to this index can be trusted; cells afterward should be estimated.
	_lastMeasuredIndex = -1;

	_cellCount;
	_cellSizeGetter;
	_estimatedCellSize;

	constructor({ cellCount, cellSizeGetter, estimatedCellSize }) {
		this._cellSizeGetter = cellSizeGetter;
		this._cellCount = cellCount;
		this._estimatedCellSize = estimatedCellSize;
	}

	getCount() {
		return this._cellCount;
	}

	getLastMeasuredIndex() {
		return this._lastMeasuredIndex;
	}

	configure({ cellCount, estimatedCellSize }) {
		this._cellCount = cellCount;
		this._estimatedCellSize = estimatedCellSize;
		this._lastMeasuredIndex = -1;
	}

	getVisibleRange({ offset, containerSize }) {
		if (this.getTotalSize() === 0) return {};

		const maxOffset = offset + containerSize;
		const start = this._findNearestIndex(offset);
		const datum = this.getSizeAndPositionOfIndex(start);
		offset = datum.offset + datum.size;

		let stop = start;
		while (offset < maxOffset && stop < this._cellCount - 1) {
			stop++;
			offset += this.getSizeAndPositionOfIndex(stop).size;
		}

		return range(start, stop + 1);
	}

	getTotalSize() {
		const { offset, size } = this.getSizeAndPositionOfLastMeasuredIndex();
		return offset + size + (this._cellCount - this._lastMeasuredIndex - 1) * this._estimatedCellSize;
	}

	getSizeAndPositionOfIndex(index) {
		if (index < 0 || index >= this._cellCount) {
			throw Error(`Requested index:${index} is out of range 0...${this._cellCount}`);
		}

		if (index > this._lastMeasuredIndex) {
			let lastMeasuredIndexSizeAndPosition = this.getSizeAndPositionOfLastMeasuredIndex();
			let offset = lastMeasuredIndexSizeAndPosition.offset + lastMeasuredIndexSizeAndPosition.size;

			for (let i = this._lastMeasuredIndex + 1; i <= index; i++) {
				let size = this._cellSizeGetter(i);
				this._cellSizeAndPositionData[i] = {
					offset,
					size,
				};

				offset += size;
				this._lastMeasuredIndex = index;
			}
		}

		// returns the cached value
		return this._cellSizeAndPositionData[index];
	}

	getSizeAndPositionOfLastMeasuredIndex() {
		return this._lastMeasuredIndex >= 0
			? this._cellSizeAndPositionData[this._lastMeasuredIndex]
			: {
					offset: 0,
					size: 0,
				};
	}

	/**
	 * Searches for the cell (index) nearest the specified offset.
	 *
	 * If no exact match is found the next lowest cell index will be returned.
	 * This allows partially visible cells (with offsets just before/above the fold) to be visible.
	 */
	_findNearestIndex(offset) {
		if (isNaN(offset)) {
			throw Error(`Invalid offset ${offset} specified`);
		}

		// Our search algorithms find the nearest match at or below the specified offset.
		// So make sure the offset is at least 0 or no match will be found.
		offset = Math.max(0, offset);

		const lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredIndex();
		const lastMeasuredIndex = Math.max(0, this._lastMeasuredIndex);

		if (lastMeasuredCellSizeAndPosition.offset >= offset) {
			// If we've already measured cells within this range just use a binary search as it's faster.
			return this._binarySearch(lastMeasuredIndex, 0, offset);
		} else {
			// If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
			// The exponential search avoids pre-computing sizes for the full set of cells as a binary search would.
			// The overall complexity for this approach is O(log n).
			return this._exponentialSearch(lastMeasuredIndex, offset);
		}
	}

	_binarySearch(high, low, offset) {
		while (low <= high) {
			const middle = low + Math.floor((high - low) / 2);
			const currentOffset = this.getSizeAndPositionOfIndex(middle).offset;

			if (currentOffset === offset) {
				return middle;
			} else if (currentOffset < offset) {
				low = middle + 1;
			} else if (currentOffset > offset) {
				high = middle - 1;
			}
		}

		if (low > 0) {
			return low - 1;
		} else {
			return 0;
		}
	}

	_exponentialSearch(index, offset) {
		let interval = 1;
		const cellCount = this._cellCount;
		const indexOffset = this.getSizeAndPositionOfIndex(index).offset;
		let newIndex = index;

		while (newIndex < cellCount && indexOffset < offset) {
			newIndex += interval;
			interval *= 2;
		}

		return this._binarySearch(Math.min(newIndex, cellCount - 1), Math.floor(newIndex / 2), offset);
	}
}
