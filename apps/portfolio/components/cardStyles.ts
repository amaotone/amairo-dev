export const portfolioCardStyle = {
	bg: "white",
	borderWidth: "1px",
	borderColor: "blackAlpha.100",
	borderRadius: "2xl",
	boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
	overflow: "hidden",
	transitionProperty: "transform, box-shadow, border-color",
	transitionDuration: "180ms",
	transitionTimingFunction: "ease",
	_hover: {
		transform: "translateY(-2px)",
		boxShadow: "0 22px 48px rgba(15, 23, 42, 0.12)",
		borderColor: "teal.200",
	},
};

export const portfolioTagRowStyle = {
	direction: "row" as const,
	flexWrap: "wrap" as const,
	gap: 2,
};
