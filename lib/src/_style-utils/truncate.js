// style-utils.js
export default function truncate(spacing = 30) {
	return `
    min-width: calc(100% - ${spacing}px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
