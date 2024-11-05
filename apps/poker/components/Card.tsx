import anime from "animejs";
import { type FC, useEffect, useState } from "react";

interface CardProps {
	id: string;
	value: string | number;
	isOpen: boolean;
	name: string;
	isSorted: boolean;
}

export const Card: FC<CardProps> = ({ id, value, isOpen, name, isSorted }) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	const [prevIsSorted, setPrevIsSorted] = useState(isSorted);

	useEffect(() => {
		const timeline = anime.timeline({
			easing: "easeOutCubic",
		});

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
				complete: () => setIsAnimationComplete(true),
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
	}, [id]);

	useEffect(() => {
		if (isSorted === prevIsSorted) return;
		setPrevIsSorted(isSorted);

		if (!isSorted) return;

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
	}, [isSorted, id, prevIsSorted]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<div
				id={`card-container-${id}`}
				style={{
					opacity: 0,
					willChange: "transform",
				}}
			>
				<div
					id={id}
					style={{
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
					}}
				>
					<div
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							backfaceVisibility: "hidden",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#0086CC",
							border: "2px solid #CBD5E0",
							borderRadius: "8px",
							transform: "rotateY(180deg)",
							transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					/>
					<div
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							backfaceVisibility: "hidden",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "white",
							border: "2px solid #CBD5E0",
							borderRadius: "8px",
							visibility: isOpen ? "visible" : "hidden",
							transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						<div style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</div>
					</div>
				</div>
			</div>
			<div
				id={`${id}-name`}
				style={{
					fontSize: "12px",
					marginTop: "4px",
					color: "#4A5568",
					fontWeight: "500",
					opacity: 0,
				}}
			>
				{name}
			</div>
		</div>
	);
};
