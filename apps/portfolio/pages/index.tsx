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
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { BlogArticles } from "../components/BlogArticles";
import { blurAppearance } from "../components/blurAppearance";
import { ProductCard } from "../components/ProductCard";
import { PulseAvatar } from "../components/PulseAvatar";
import { SkillRaders } from "../components/SkillRadars";
import { SocialIcons } from "../components/SocialIcons";

const Home: NextPage = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  return (
    <>
      <Head>
        <title>amairo.dev</title>
        <meta name="description" content="Amane Suzuki's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="4xl" my={12} sx={blurAppearance}>
        <Particles
          init={particlesInit}
          options={{
            detectRetina: true,
            fpsLimit: 120,
            particles: {
              size: { value: 2, random: true, anim: { enable: true } },
              color: {
                value: "#cccccc",
              },
              opacity: {
                value: 0.4,
                anim: {
                  enable: true,
                },
              },
              line_linked: {
                color: "#cccccc",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
              },
            },
          }}
          style={{
            position: "fixed",
            zIndex: -1,
          }}
        />

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
          <Text>Kaggle Master。AtCoder水色。</Text>
          <Text>
            趣味は個人開発で、React、Next.jsをはじめとしたフロントエンド技術によく触れています。
          </Text>
        </Box>
        <Box>
          <Heading as="h2" mt={12} mb={6}>
            Product
          </Heading>
          <SimpleGrid columns={[1, 3]} spacing={3}>
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
