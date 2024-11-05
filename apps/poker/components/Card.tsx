import anime from "animejs";
import { Coffee02Icon } from "hugeicons-react";
import { type FC, useEffect, useState } from "react";

interface CardProps {
	id: string;
	value: string | number;
	isOpen: boolean;
	name: string;
	isSorted: boolean;
}

interface CardStyles {
	container: React.CSSProperties;
	cardWrapper: React.CSSProperties;
	card: React.CSSProperties;
	cardFace: React.CSSProperties;
	cardBack: React.CSSProperties;
	cardFront: React.CSSProperties;
	nameLabel: React.CSSProperties;
}

const baseCardFaceStyle: React.CSSProperties = {
	position: "absolute",
	width: "100%",
	height: "100%",
	backfaceVisibility: "hidden",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	border: "2px solid #CBD5E0",
	borderRadius: "8px",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const createCardStyles = (
	isAnimationComplete: boolean,
	isOpen: boolean,
): CardStyles => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	cardWrapper: {
		opacity: 0,
		willChange: "transform",
	},
	card: {
		width: "60px",
		height: "90px",
		position: "relative",
		transformStyle: "preserve-3d",
		transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		transform: isAnimationComplete
			? isOpen
				? "rotateY(0deg)"
				: "rotateY(180deg)"
			: "rotateY(180deg)",
	},
	cardFace: baseCardFaceStyle,
	cardBack: {
		...baseCardFaceStyle,
		backgroundColor: "#0086CC",
		transform: "rotateY(180deg)",
	},
	cardFront: {
		...baseCardFaceStyle,
		backgroundColor: "white",
		flexDirection: "column",
		visibility: isOpen ? "visible" : "hidden",
	},
	nameLabel: {
		fontSize: "12px",
		marginTop: "4px",
		color: "#4A5568",
		fontWeight: "500",
		opacity: 0,
	},
});

const animateInitialAppearance = (id: string, onComplete: () => void) => {
	const timeline = anime.timeline({ easing: "easeOutCubic" });
	const element = document.getElementById(`card-container-${id}`);

	if (element) {
		element.style.opacity = "0";
		element.style.transform = "translateY(30px)";
	}

	timeline
		.add({
			targets: `#card-container-${id}`,
			translateY: [30, 0],
			opacity: [0, 1],
			duration: 400,
			complete: onComplete,
		})
		.add({
			targets: `#${id}-name`,
			opacity: [0, 1],
			duration: 300,
			begin: () => {
				const nameElement = document.getElementById(`${id}-name`);
				if (nameElement) nameElement.style.opacity = "0";
			},
			delay: 100,
		});
};

const animateSortedAppearance = (id: string) => {
	const element = document.getElementById(`card-container-${id}`);
	if (!element) return;

	element.style.opacity = "0";
	element.style.transform = "translateY(-50px)";

	anime({
		targets: element,
		translateY: [-50, 0],
		opacity: [0, 1],
		duration: 500,
		easing: "easeOutBounce",
	});
};

export const Card: FC<CardProps> = ({ id, value, isOpen, name, isSorted }) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	const [prevIsSorted, setPrevIsSorted] = useState(isSorted);
	const styles = createCardStyles(isAnimationComplete, isOpen);

	useEffect(() => {
		animateInitialAppearance(id, () => setIsAnimationComplete(true));
	}, [id]);

	useEffect(() => {
		if (isSorted === prevIsSorted) return;
		setPrevIsSorted(isSorted);

		if (!isSorted) return;
		animateSortedAppearance(id);
	}, [isSorted, id, prevIsSorted]);

	return (
		<div style={styles.container}>
			<div id={`card-container-${id}`} style={styles.cardWrapper}>
				<div id={id} style={styles.card}>
					<div style={styles.cardBack} />
					<div style={styles.cardFront}>
						<div style={{ fontSize: "xl", fontWeight: "bold" }}>
							{value === "☕" ? <Coffee02Icon color="currentColor" /> : value}
						</div>
					</div>
				</div>
			</div>
			<div id={`${id}-name`} style={styles.nameLabel}>
				{name}
			</div>
		</div>
	);
};
