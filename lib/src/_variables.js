export const fontFamily =
	'-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif';

export const gridSize = 10;
export const halfGridSize = gridSize / 2;
export const borderRadius = 3;
export const fontSize = gridSize * 1.4;
export const fontSizeSmall = gridSize * 1.2;
export const fontSizeLarge = gridSize * 1.6;
export const fontWeight = 400;
export const lineHeight = Math.ceil(gridSize * 1.8 * 10000 / fontSize) / 10000;
export const lineHeightLarge = 1.5;

// Z-INDICES
export const zIndexBase = 0;
export const zIndexContent = zIndexBase + 10;
export const zIndexOverlay = zIndexBase + 20;

// BUTTONS
export const buttonHeightSmall = gridSize * 12 / 5;
export const buttonHeight = gridSize * 15 / 5;
export const buttonHeightLarge = gridSize * 20 / 5;

export const buttonWidthSmall = buttonHeightSmall;
export const buttonWidth = buttonHeight;
export const buttonWidthLarge = buttonHeightLarge;

// POPOVER
export const popoverMaxWidth = gridSize * 35;
export const popoverPadding = gridSize * 2;

export const popoverArrowHeight = buttonHeight;
export const popoverArrowWidth = buttonHeight;

// ICONS
export const iconSize = gridSize * 1;
export const iconSizeSmall = gridSize * 0.8;
export const iconSizeLarge = gridSize * 1.4;

// MENU
export const menuMinWidth = gridSize * 18;
export const menuItemPadding = (buttonHeight - iconSize) / 2;
export const menuItemPaddingLarge = (buttonHeightLarge - iconSizeLarge) / 2;
