import {
	Box,
	Center,
	Container,
	Heading,
	SimpleGrid,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { BlogArticles } from "../components/BlogArticles";
import { ProductCard } from "../components/ProductCard";
import { PulseAvatar } from "../components/PulseAvatar";
import { SkillRaders } from "../components/SkillRadars";
import { SocialIcons } from "../components/SocialIcons";
import { blurAppearance } from "../components/blurAppearance";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>amairo.dev</title>
				<meta name="description" content="Amane Suzuki's personal website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container maxW="4xl" my={12} sx={blurAppearance}>
				<Center>
					<VStack direction={"column"} spacing={6}>
						<PulseAvatar
							name="Amane Suzuki"
							src="/profile.jpg"
							bgColor="teal"
							size="120px"
						/>
						<Heading as="h1" size="2xl" m={3}>
							amairo.dev
						</Heading>
						<SocialIcons fontSize="2xl" />
					</VStack>
				</Center>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						About me
					</Heading>
					<Text fontWeight={700}>鈴木天音 / Amane Suzuki</Text>
					<Text>
						機械学習・データエンジニアリングをバックグラウンドに持つソフトウェアエンジニアです。
					</Text>
					<Text>
						東京大学大学院でケモインフォマティクスを専攻した後、ディー・エヌ・エーで機械学習エンジニアとしてレコメンドや最適化に取り組みました。キャディでは機械学習基盤の構築やデータチームの立ち上げを経て、現在はAI
						agent関連の開発を行っています。Kaggle Master。
					</Text>
					<Text>
						個人開発では、使っていて心地よいと感じるプロダクトを目指しています。最近はAIを活用した開発プロセスに関心があり、小さなチームや個人でプロダクトを形にすることに取り組んでいます。
					</Text>
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Product
					</Heading>
					<SimpleGrid columns={[1, 3]} spacing={3}>
						<ProductCard
							title="fusen"
							text="リンクを送るだけでみんなで使えるTODOアプリ。家族や仲間内でサッとタスクを共有できます。"
							link="https://thefusen.com"
							code="https://github.com/amaotone/fusen"
							tags={["React", "Vite", "Supabase"]}
						/>
						<ProductCard
							title="一文一会"
							text="ランダムに出てくるフレーズをもとに本と出会うサービス。アニメーションに力を入れました。"
							link="https://ichibunichie.com"
							blog="https://amalog.hateblo.jp/entry/ichibunichie-dev"
							code="https://github.com/amaotone/ichibunichie"
							image="https://ichibunichie.com/og.jpg"
							tags={["Next.js", "Tailwind", "Firebase"]}
						/>
						<ProductCard
							title="Among Us Note"
							text="Among Usの盤面精査をするツールです。毎日のように遊んでいたときにつくりました。"
							link="https://aunote.site"
							blog="https://amalog.hateblo.jp/entry/among-us-note-dev"
							code="https://github.com/amaotone/among-us-note"
							image="https://aunote.site/ogp.png"
							tags={["Next.js"]}
						/>
						<ProductCard
							title="amairo.dev"
							text="このwebサイトです。ChakraとCSSアニメーションを勉強するためにつくりました。"
							link="https://amairo.dev"
							image="/og.jpg"
							tags={["Next.js", "Chakra"]}
						/>
					</SimpleGrid>
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Favorite
					</Heading>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Category</Th>
								<Th>Contents</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>Programming Language</Td>
								<Td>Python, TypeScript</Td>
							</Tr>
							<Tr>
								<Td>ML Library</Td>
								<Td>PyTorch, LightGBM</Td>
							</Tr>
						</Tbody>
					</Table>
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Skill
					</Heading>
					<SkillRaders />
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Blog
					</Heading>
					<BlogArticles />
				</Box>
			</Container>
		</>
	);
};

export default Home;
