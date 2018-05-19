import React, { Component } from "react";
import { compose, path, assoc, assocPath, isEmpty, not, either, isNil } from "ramda";

import Select from "./Select";

const isNotOrNilEmpty = compose(not, either(isEmpty, isNil));

let nameCache = {};
const updateCache = (name, cacheKey, data) => {
	nameCache = assocPath([name, cacheKey], data, nameCache);
};
let getCache = (name, cacheKey) => path([name, cacheKey], nameCache);

class Async extends Component {
	static defaultProps = {
		loadingPlaceholder: "Loading...",
	};
	state = { options: [], isLoading: false };

	componentDidMount() {
		const { autoload, value } = this.props;
		if (!isEmpty(value)) this.loadOptions("");
		if (autoload) this.loadOptions("");
	}
	render() {
		const { loadingPlaceholder, placeholder, name, loadOptions, ...otherProps } = this.props;
		let { isLoading, options } = this.state;
		const placeholderText = isLoading ? loadingPlaceholder : placeholder;
		const optionsToShow = isLoading && loadingPlaceholder ? [] : options;

		return <Select {...otherProps} name={name} items={optionsToShow} placeholder={placeholderText} />;
	}

	loadOptions() {
		const { loadOptions, name, cacheKey = "" } = this.props;
		const cache = getCache(name, cacheKey);

		if (isNotOrNilEmpty(cache)) {
			const options = cache;
			const set = compose(assoc("isLoading", false), assoc("options", options));
			this.setState(set);
			return;
		}

		loadOptions().then(options => {
			const set = compose(assoc("isLoading", false), assoc("options", options));
			return this.setState(set, () => updateCache(name, cacheKey, options));
		});

		if (!this.state.isLoading) {
			this.setState(assoc("isLoading", true));
		}
	}
}

export default Async;
