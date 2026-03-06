import {
	Box,
	Center,
	Container,
	Heading,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { ProductCard } from "../components/ProductCard";
import { PulseAvatar } from "../components/PulseAvatar";
import { SocialIcons } from "../components/SocialIcons";
import { blurAppearance } from "../components/blurAppearance";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>amairo.dev</title>
				<meta
					name="description"
					content="AIとデータの深い専門性を軸に、個人開発でフルスタックな経験を積んできたソフトウェアエンジニア Amane Suzuki のポートフォリオ。"
				/>
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
					<Text fontSize="lg" fontWeight={800} mb={1}>
						鈴木天音 / Amane Suzuki
					</Text>
					<Text>
						AIとデータの深い専門性を持ちながら、個人開発で幅広い経験を積んできたソフトウェアエンジニアです。アルゴリズムや基盤だけでなく、UI、フロントエンド、バックエンドまで自分でつなぎ、プロダクトとして素早く形にするのが得意です。
					</Text>
					<Text>
						東京大学大学院でケモインフォマティクスを専攻した後、ディー・エヌ・エーで機械学習エンジニアとしてレコメンドや最適化に取り組みました。キャディでは機械学習基盤の構築やデータチームの立ち上げを担い、現在はAI
						agent関連の開発を行っています。Kaggle Master。
					</Text>
					<Text>
						個人開発では、使っていて気持ちいいUIや、毎日自然に開きたくなる体験を大切にしています。AIを活用して小さく速く試しながら、技術の深さとプロダクトの手触りを両立させるのが好きです。
					</Text>
				</Box>
				<Box>
					<Heading as="h2" mt={12} mb={6}>
						Product
					</Heading>
					<SimpleGrid columns={[1, 3]} spacing={3}>
						<ProductCard
							title="ツギヨム"
							text="どこまで読んだ？を爆速記録するのに特化した読書記録アプリです。"
							link="https://apps.apple.com/jp/app/%E8%AA%AD%E6%9B%B8%E7%AE%A1%E7%90%86%E3%83%84%E3%82%AE%E3%83%A8%E3%83%A0-%E3%83%9E%E3%83%B3%E3%82%AC%E8%AA%AD%E6%9B%B8%E8%A8%98%E9%8C%B2/id6759438934"
							blog="https://note.com/amaotone/n/n6f3d347cc674"
							image="/tsugiyomu-og.png"
							tags={["iOS", "React Native"]}
						/>
						<ProductCard
							title="fusen"
							text="リンクを送るだけでみんなで使えるTODOアプリ。家族や仲間内でサッとタスクを共有できます。"
							link="https://thefusen.com"
							image="https://thefusen.com/ogp.png"
							tags={["React", "Vite", "Supabase"]}
						/>
						<ProductCard
							title="一文一会"
							text="ランダムに出てくるフレーズをもとに本と出会うサービス。アニメーションに力を入れました。"
							link="https://ichibunichie.com"
							blog="https://amalog.hateblo.jp/entry/ichibunichie-dev"
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
					<SimpleGrid columns={[1, 2]} spacing={4}>
						<Box bg="white" boxShadow="base" borderRadius="xl" p={6}>
							<Text color="teal.500" fontSize="sm" fontWeight={700} mb={2}>
								Code
							</Text>
							<Heading as="h3" size="md" mb={3}>
								毎日書いていて楽しい技術
							</Heading>
							<Text mb={4}>
								Python と TypeScript
								が中心です。データやMLの実験から、プロダクトとして仕上げる実装まで、この2つで行き来するのが好きです。
							</Text>
							<Stack direction="row" flexWrap="wrap" gap={2}>
								<Tag>Python</Tag>
								<Tag>TypeScript</Tag>
								<Tag>React</Tag>
								<Tag>React Native</Tag>
							</Stack>
						</Box>
						<Box bg="white" boxShadow="base" borderRadius="xl" p={6}>
							<Text color="orange.400" fontSize="sm" fontWeight={700} mb={2}>
								Machine Learning
							</Text>
							<Heading as="h3" size="md" mb={3}>
								深く向き合ってきた領域
							</Heading>
							<Text mb={4}>
								推薦、最適化、MLOps
								まわりに長く取り組んできました。モデルそのものだけでなく、継続的に価値を出せる運用まで含めて考えるのが好きです。
							</Text>
							<Stack direction="row" flexWrap="wrap" gap={2}>
								<Tag>PyTorch</Tag>
								<Tag>LightGBM</Tag>
								<Tag>Recommendation</Tag>
								<Tag>MLOps</Tag>
							</Stack>
						</Box>
						<Box bg="white" boxShadow="base" borderRadius="xl" p={6}>
							<Text color="pink.400" fontSize="sm" fontWeight={700} mb={2}>
								Product
							</Text>
							<Heading as="h3" size="md" mb={3}>
								手触りのよいプロダクト
							</Heading>
							<Text mb={4}>
								使っていて気持ちいいUIや、毎日つい開きたくなる体験に惹かれます。小さくつくって試し、磨きながら育てていく過程が好きです。
							</Text>
							<Stack direction="row" flexWrap="wrap" gap={2}>
								<Tag>UI</Tag>
								<Tag>UX</Tag>
								<Tag>Animation</Tag>
								<Tag>Indie Hacking</Tag>
							</Stack>
						</Box>
						<Box bg="white" boxShadow="base" borderRadius="xl" p={6}>
							<Text color="blue.400" fontSize="sm" fontWeight={700} mb={2}>
								Outside Work
							</Text>
							<Heading as="h3" size="md" mb={3}>
								発信と学び
							</Heading>
							<Text mb={4}>
								ブログや note
								で開発の振り返りを書くのが好きです。技術を整理して言語化すると、自分のつくりたいものもはっきりしてきます。
							</Text>
							<Stack direction="row" flexWrap="wrap" gap={2}>
								<Tag>Blog</Tag>
								<Tag>note</Tag>
								<Tag>Kaggle</Tag>
								<Tag>Writing</Tag>
							</Stack>
						</Box>
					</SimpleGrid>
				</Box>
			</Container>
		</>
	);
};

export default Home;
