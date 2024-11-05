import { Box, Button, Container, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { CardGrid } from "../components/CardGrid";
import { CardSelector } from "../components/CardSelector";
import { Header } from "../components/Header";
import { ResetDialog } from "../components/ResetDialog";
import { Stats } from "../components/Stats";
import type { CardType, CardValue } from "../types";

const NAMES = [
	"Alice",
	"Bob",
	"Charlie",
	"Dave",
	"Eve",
	"Frank",
	"Grace",
	"Henry",
	"Ivy",
	"Jack",
	"Kelly",
	"Liam",
	"Mia",
	"Noah",
	"Olivia",
	"Peter",
	"Quinn",
	"Ruby",
	"Sam",
	"Tara",
	"Uma",
	"Victor",
	"Wendy",
	"Xander",
	"Yuki",
	"Zoe",
	"Christopher Alexander",
	"Elizabeth Windsor",
	"Benjamin Franklin",
	"Alexandria Ocasio",
] as const;

const getRandomName = (): string => {
	const randomIndex = Math.floor(Math.random() * NAMES.length);
	return NAMES[randomIndex];
};

const Home: NextPage = () => {
	const [cards, setCards] = useState<CardType[]>([]);
	const [isSorting, setIsSorting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleAddCard = (selectedValue: CardValue) => {
		const newCard: CardType = {
			id: `card-${Date.now()}`,
			value: selectedValue,
			isOpen: false,
			name: getRandomName(),
			isSorted: false,
		};
		setCards((prev) => [...prev, newCard]);
	};

	const handleOpenAll = () => {
		let delay = 0;
		cards.forEach((card, index) => {
			setTimeout(() => {
				setCards((prev) =>
					prev.map((c) => (c.id === card.id ? { ...c, isOpen: true } : c)),
				);
				// 最後のカードが開いた後にソートを実行
				if (index === cards.length - 1) {
					setTimeout(() => {
						const sortedCards = [...cards]
							.sort((a, b) => {
								// 数値同士の比較
								if (
									typeof a.value === "number" &&
									typeof b.value === "number"
								) {
									return a.value - b.value;
								}
								// 数値を文字列より前に
								if (typeof a.value === "number") return -1;
								if (typeof b.value === "number") return 1;
								// ☕を最後に
								if (a.value === "☕") return 1;
								if (b.value === "☕") return -1;
								// ?を☕の前に
								if (a.value === "?") return -1;
								if (b.value === "?") return 1;
								// ここまでこない（型安全のため）
								return 0;
							})
							.map((card) => ({
								...card,
								isOpen: true,
								isSorted: true,
							}));
						setCards(sortedCards);
					}, 500);
				}
			}, delay);
			delay += 50;
		});
	};

	const handleReset = () => {
		setCards([]);
		setIsOpen(false);
	};

	return (
		<>
			<Head>
				<title>Planning Poker</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container
				minH="100vh"
				maxW="container.lg"
				bg="white"
				p={0}
				display="flex"
				flexDirection="column"
			>
				<Header />

				<Box
					px={8}
					flex="1"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					overflow="auto"
				>
					<VStack gap="6" align="stretch">
						<Box>
							<HStack gap={4} justify="center">
								<Button
									onClick={handleOpenAll}
									disabled={cards.length === 0}
									colorScheme="brand"
									size="md"
									width="140px"
								>
									Open
								</Button>
								<Button
									onClick={() => setIsOpen(true)}
									disabled={cards.length === 0}
									colorScheme="gray"
									variant="outline"
									size="md"
									width="140px"
								>
									New Poker
								</Button>
							</HStack>

							<Stats cards={cards} />
						</Box>

						<Box>
							<CardGrid cards={cards} />
						</Box>
					</VStack>
				</Box>

				<CardSelector onSelect={handleAddCard} />
			</Container>

			<ResetDialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onReset={handleReset}
			/>
		</>
	);
};

export default Home;
