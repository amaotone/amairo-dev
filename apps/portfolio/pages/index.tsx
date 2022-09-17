import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { blurAppearance } from "../components/blurAppearance";
import { ProductCard } from "../components/ProductCard";
import { PulseAvatar } from "../components/PulseAvatar";
import { SocialIcons } from "../components/SocialIcons";

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
            <PulseAvatar src="/profile.jpg" bgColor="teal" size="120px" />
            <Heading as="h1" size="2xl" m={3}>
              amairo.dev
            </Heading>
            <SocialIcons fontSize="2xl" />
          </VStack>
        </Center>
        <Box>
          <Heading as="h2" mt={12} mb={6}>
            about me
          </Heading>
          <Text fontWeight={700}>鈴木天音 / Amane Suzuki</Text>
          <Text>
            東京大学、東京大学大学院にてケモインフォマティクス（化学と機械学習の融合領域）を専攻しました。
          </Text>
          <Text>
            2019年、株式会社ディー・エヌ・エーに入社し機械学習や最適化のプロジェクトに携わりました。
          </Text>
          <Text>
            2022年、キャディ株式会社に入社し、AI
            Labで機械学習プロジェクトの立ち上げやGoogle
            Cloudを活用した機械学習基盤の開発などに携っています。
          </Text>
          <Text>
            Kaggle Master。AtCoder水色。
            趣味は個人開発で、Reactをはじめとしたフロントエンド技術によく触っています。
          </Text>
        </Box>
        <Box>
          <Heading as="h2" mt={12} mb={6}>
            products
          </Heading>
          <SimpleGrid columns={[1, 3]} spacing={3}>
            <ProductCard
              title="一文一会"
              text="ランダムに出てくるフレーズをもとに本と出会うサービス。アニメーションに力を入れました。"
              link="https://ichibunichie.com"
              blog="https://amalog.hateblo.jp/entry/ichibunichie-dev"
              code="https://github.com/amaotone/ichibunichie"
              image="https://ichibunichie.com/og.jpg"
              badges={["Next.js", "Tailwind", "Firebase"]}
            />
            <ProductCard
              title="Among Us Note"
              text="Among Usの盤面精査をするツールです。毎日のように遊んでいたときにつくりました。"
              link="https://aunote.site"
              blog="https://amalog.hateblo.jp/entry/among-us-note-dev"
              code="https://github.com/amaotone/among-us-note"
              image="https://aunote.site/ogp.png"
              badges={["Next.js"]}
            />
            <ProductCard
              title="amairo.dev"
              text="このwebサイトです。ChakraとCSSアニメーションを勉強するためにつくりました。"
              link="https://amairo.dev"
              image="/og.jpg"
              badges={["Next.js", "Chakra"]}
            />
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
