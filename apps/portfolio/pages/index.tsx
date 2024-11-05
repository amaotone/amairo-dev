import {
	Box,
	Center,
	Container,
	Heading,
	Mark,
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
import { Client } from "@notionhq/client";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { NotionToMarkdown } from "notion-to-md";
import ReactMarkdown from "react-markdown";
import { BlogArticles } from "../components/BlogArticles";
import { ProductCard } from "../components/ProductCard";
import { PulseAvatar } from "../components/PulseAvatar";
import { SkillRaders } from "../components/SkillRadars";
import { SocialIcons } from "../components/SocialIcons";
import { blurAppearance } from "../components/blurAppearance";

// type Props = {
// 	profile: Profile;
// 	products: Product[];
// 	skills: Skill[];
// };

type Props = {
	page: string;
};

const theme = {
	p: (props: { children: React.ReactNode }) => {
		const { children } = props;
		return <Text>{children}</Text>;
	},
	h1: (props: { children: React.ReactNode }) => {
		const { children } = props;
		return (
			<Heading as="h1" m={12} mb={6}>
				{children}
			</Heading>
		);
	},
	h2: (props: { children: React.ReactNode }) => {
		const { children } = props;
		return (
			<Heading as="h2" mt={12} mb={6}>
				{children}
			</Heading>
		);
	},
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const notion = new Client({ auth: process.env.NOTION_TOKEN });
	const n2m = new NotionToMarkdown({ notionClient: notion });
	const blocks = await n2m.pageToMarkdown("134bad0b632e801b995cddaf58fed5ab");
	const page = n2m.toMarkdownString(blocks);

	console.log("%o", page.parent);
	console.log("%o", blocks);

	return {
		props: {
			page: page.parent,
		},
		revalidate: 60,
	};
};

const Home: NextPage<Props> = ({ page }) => {
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
						<Heading as="h1" size="2xl" m={3} mb={0}>
							Amane Suzuki
						</Heading>
						<Heading size="md">{"{AI, Data, Product} Engineer"}</Heading>
						<SocialIcons fontSize="2xl" />
					</VStack>
				</Center>
				<Box>
					<ReactMarkdown components={ChakraUIRenderer(theme)} skipHtml>
						{page}
					</ReactMarkdown>
				</Box>
				<Box>
					{/* <SimpleGrid columns={[1, 3]} spacing={3}>
						{products.map((product) => (
							<ProductCard key={product.title} {...product} />
						))}
					</SimpleGrid> */}
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Skills
					</Heading>
				</Box>

				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Background
					</Heading>
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Writing
					</Heading>
					<BlogArticles />
				</Box>
			</Container>
		</>
	);
};

export default Home;
