import { Box, Container, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ActionButtons } from "../../components/ActionButtons";
import { CardGrid } from "../../components/CardGrid";
import { CardSelector } from "../../components/CardSelector";
import { Header } from "../../components/Header";
import { ResetDialog } from "../../components/ResetDialog";
import { Stats } from "../../components/Stats";
import { useCards } from "../../hooks/useCards";
import { useResetDialog } from "../../hooks/useResetDialog";

const Room: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cards, addCard, openAllCards, resetCards } = useCards();
  const { isOpen, openDialog, closeDialog } = useResetDialog();

  const handleReset = () => {
    resetCards();
    closeDialog();
  };

  return (
    <>
      <Head>
        <title>Planning Poker - Room {id}</title>
        <meta name="description" content="Planning Poker Room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        minH="100dvh"
        maxW="container.lg"
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
          <VStack gap={8} align="stretch">
            <Box>
              <ActionButtons
                onOpenAll={openAllCards}
                onNext={openDialog}
                disabled={cards.length === 0}
              />

              <Stats cards={cards} />
            </Box>

            <Box>
              <CardGrid cards={cards} />
            </Box>
          </VStack>
        </Box>

        <CardSelector onSelect={addCard} />
      </Container>

      <ResetDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onReset={handleReset}
      />
    </>
  );
};

export default Room;
