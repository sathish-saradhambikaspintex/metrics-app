import { curry } from "ramda";
import Color from "tinycolor2";

// COLOR LIBRTARY
export const BLACK = "#10161A";

export const BLUE1 = "#0E5A8A";
export const BLUE2 = "#106BA3";
export const BLUE3 = "#137CBD";
export const BLUE4 = "#2B95D6";
export const BLUE5 = "#48AFF0";

export const COBALT1 = "#1F4B99";
export const COBALT2 = "#2458B3";
export const COBALT3 = "#2965CC";
export const COBALT4 = "#4580E6";
export const COBALT5 = "#669EFF";

export const DARK_GRAY1 = "#182026";
export const DARK_GRAY2 = "#202B33";
export const DARK_GRAY3 = "#293742";
export const DARK_GRAY4 = "#30404D";
export const DARK_GRAY5 = "#394B59";

export const FOREST1 = "#1D7324";
export const FOREST2 = "#238C2C";
export const FOREST3 = "#29A634";
export const FOREST4 = "#43BF4D";
export const FOREST5 = "#62D96B";

export const GOLD1 = "#A67908";
export const GOLD2 = "#BF8C0A";
export const GOLD3 = "#D99E0B";
export const GOLD4 = "#F2B824";
export const GOLD5 = "#FFC940";

export const GRAY1 = "#5C7080";
export const GRAY2 = "#738694";
export const GRAY3 = "#8A9BA8";
export const GRAY4 = "#A7B6C2";
export const GRAY5 = "#BFCCD6";

export const GREEN1 = "#0A6640";
export const GREEN2 = "#0D8050";
export const GREEN3 = "#0F9960";
export const GREEN4 = "#15B371";
export const GREEN5 = "#3DCC91";

export const INDIGO1 = "#5642A6";
export const INDIGO2 = "#634DBF";
export const INDIGO3 = "#7157D9";
export const INDIGO4 = "#9179F2";
export const INDIGO5 = "#AD99FF";

export const LIGHT_GRAY1 = "#CED9E0";
export const LIGHT_GRAY2 = "#D8E1E8";
export const LIGHT_GRAY3 = "#E1E8ED";
export const LIGHT_GRAY4 = "#EBF1F5";
export const LIGHT_GRAY5 = "#F5F8FA";

export const LIME1 = "#728C23";
export const LIME2 = "#87A629";
export const LIME3 = "#9BBF30";
export const LIME4 = "#B6D94C";
export const LIME5 = "#D1F26D";

export const ORANGE1 = "#A66321";
export const ORANGE2 = "#BF7326";
export const ORANGE3 = "#D9822B";
export const ORANGE4 = "#F29D49";
export const ORANGE5 = "#FFB366";

export const RED1 = "#A82A2A";
export const RED2 = "#C23030";
export const RED3 = "#DB3737";
export const RED4 = "#F55656";
export const RED5 = "#FF7373";

export const ROSE1 = "#A82255";
export const ROSE2 = "#C22762";
export const ROSE3 = "#DB2C6F";
export const ROSE4 = "#F5498B";
export const ROSE5 = "#FF66A1";

export const SEPIA1 = "#63411E";
export const SEPIA2 = "#7D5125";
export const SEPIA3 = "#96622D";
export const SEPIA4 = "#B07B46";
export const SEPIA5 = "#C99765";

export const TURQUOISE1 = "#008075";
export const TURQUOISE2 = "#00998C";
export const TURQUOISE3 = "#00B3A4";
export const TURQUOISE4 = "#14CCBD";
export const TURQUOISE5 = "#2EE6D6";

export const VERMILION1 = "#9E2B0E";
export const VERMILION2 = "#B83211";
export const VERMILION3 = "#D13913";
export const VERMILION4 = "#EB532D";
export const VERMILION5 = "#FF6E4A";

export const VIOLET1 = "#5C255C";
export const VIOLET2 = "#752F75";
export const VIOLET3 = "#8F398F";
export const VIOLET4 = "#A854A8";
export const VIOLET5 = "#C274C2";

export const WHITE = "#FFFFFF";

// COLOR UTILITIES
export const colorWithAlpha = curry((color, alpha) =>
	Color(color)
		.setAlpha(alpha)
		.toRgbString()
);
export const blackWithAlpha = colorWithAlpha(BLACK);
export const whiteWithAlpha = colorWithAlpha(WHITE);

/* DEFAULT COLORS */
const BLACK_40 = blackWithAlpha(0.4);
const BLACK_20 = blackWithAlpha(0.2);
const WHITE_10 = whiteWithAlpha(0.1);
export const WHITE_50 = whiteWithAlpha(0.5);
export const WHITE_0 = whiteWithAlpha(0);

// INTENT COLORS
export const INTENTS = {
	default: {
		color: DARK_GRAY1,
		inverseColor: DARK_GRAY2,
		bgColor: LIGHT_GRAY4,
		bgHoverColor: LIGHT_GRAY3,
		borderColor: colorWithAlpha(DARK_GRAY3, 0.4),
		borderColorFocus: colorWithAlpha(DARK_GRAY3, 0.5),
		disabledColor: colorWithAlpha(DARK_GRAY3, 0.6),
		disabledBgColor: colorWithAlpha(DARK_GRAY3, 0.15),
		readonlyColor: colorWithAlpha(DARK_GRAY3, 0.6),
		bgInverseColor: colorWithAlpha(DARK_GRAY4, 0.15),
		backgroundCss: `linear-gradient(to bottom, ${WHITE}, ${WHITE_0}) left no-repeat, center no-repeat ${LIGHT_GRAY5}`,
		backgroundHoverCss: `linear-gradient(to bottom, ${WHITE_50}, ${WHITE_0}) left no-repeat, center no-repeat ${LIGHT_GRAY4}`,
		boxShadow: `0 0 0 1px ${BLACK_40}, 0 -1px 0 ${BLACK_20}`,
	},
	primary: {
		color: WHITE,
		inverseColor: BLUE2,
		bgColor: BLUE3,
		bgInverseColor: colorWithAlpha(BLUE3, 0.15),
		borderColor: colorWithAlpha(BLUE3, 0.4),
		borderColorFocus: colorWithAlpha(BLUE3, 0.5),
		disabledColor: colorWithAlpha(BLUE3, 0.6),
		disabledBgColor: colorWithAlpha(BLUE3, 0.15),
		readonlyColor: colorWithAlpha(BLUE3, 0.6),
		bgHoverColor: BLUE2,
		backgroundCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${BLUE3}`,
		backgroundHoverCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${BLUE2}`,
		boxShadow: `0 0 0 1px ${BLACK_40}, 0 -1px 0 ${BLACK_20}`,
	},
	success: {
		color: WHITE,
		inverseColor: GREEN2,
		bgColor: GREEN3,
		bgInverseColor: colorWithAlpha(GREEN3, 0.15),
		borderColor: colorWithAlpha(GREEN3, 0.4),
		borderColorFocus: colorWithAlpha(GREEN3, 0.5),
		disabledColor: colorWithAlpha(GREEN3, 0.6),
		disabledBgColor: colorWithAlpha(GREEN3, 0.15),
		readonlyColor: colorWithAlpha(GREEN3, 0.6),
		bgHoverColor: GREEN2,
		backgroundCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${GREEN3}`,
		backgroundHoverCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${GREEN2}`,
		boxShadow: `0 0 0 1px ${BLACK_40}, 0 -1px 0 ${BLACK_20}`,
	},
	warning: {
		color: WHITE,
		inverseColor: ORANGE2,
		bgColor: ORANGE3,
		bgInverseColor: colorWithAlpha(ORANGE3, 0.15),
		borderColor: colorWithAlpha(ORANGE3, 0.4),
		borderColorFocus: colorWithAlpha(ORANGE3, 0.5),
		disabledColor: colorWithAlpha(ORANGE3, 0.6),
		disabledBgColor: colorWithAlpha(ORANGE3, 0.15),
		readonlyColor: colorWithAlpha(ORANGE3, 0.6),
		bgHoverColor: ORANGE2,
		backgroundCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${ORANGE3}`,
		backgroundHoverCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${ORANGE2}`,
		boxShadow: `0 0 0 1px ${BLACK_40}, 0 -1px 0 ${BLACK_20}`,
	},
	danger: {
		color: WHITE,
		inverseColor: RED2,
		bgColor: RED3,
		bgInverseColor: colorWithAlpha(RED3, 0.15),
		borderColor: colorWithAlpha(RED3, 0.4),
		borderColorFocus: colorWithAlpha(RED3, 0.5),
		disabledColor: colorWithAlpha(RED3, 0.6),
		disabledBgColor: colorWithAlpha(RED3, 0.15),
		readonlyColor: colorWithAlpha(RED3, 0.6),
		bgHoverColor: RED2,
		backgroundCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${RED3}`,
		backgroundHoverCss: `linear-gradient(to bottom, ${WHITE_10}, ${WHITE_0}) left no-repeat, center no-repeat ${RED2}`,
		boxShadow: `0 0 0 1px ${BLACK_40}, 0 -1px 0 ${BLACK_20}`,
	},
};

export const ALT_INTENTS = {
	default: [WHITE, DARK_GRAY5],
	primary: [WHITE, BLUE2],
	success: [WHITE, GREEN2],
	warning: [WHITE, ORANGE2],
	danger: [WHITE, RED2],
};

// DIVIDER COLORS
export const dividerBlackColor = colorWithAlpha(BLACK, 0.15);
export const dividerWhiteColor = colorWithAlpha(WHITE, 0.15);

// TEXT COLORS
export const textColor = BLACK;
export const textSelectionColor = colorWithAlpha(BLUE3, 0.2);
export const textColorMuted = GRAY1;
export const textColorDisabled = colorWithAlpha(textColorMuted, 0.5);

// LINK COLORS
export const linkColor = BLUE2;

// BUTTON COLORS
export const minimalButtonBackgroundColor = "none";
export const minimalButtonBackgroundHoverColor = colorWithAlpha(GRAY4, 0.3);
export const minimalButtonBackgroundActiveColor = colorWithAlpha(GRAY2, 0.3);

// MENU COLORS
export const menuBackgroundColor = WHITE;
export const menuItemHoverColor = minimalButtonBackgroundHoverColor;
export const menuItemActiveColor = minimalButtonBackgroundActiveColor;

// ICON COLORS
export const iconColor = textColorMuted;
export const iconColorDisabled = colorWithAlpha(textColorMuted, 0.5);
