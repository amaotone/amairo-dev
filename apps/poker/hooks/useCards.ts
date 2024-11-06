import { useCallback, useState } from "react";
import { createCard, sortCards } from "../utils/cards";
import type { CardType, CardValue } from "../utils/types";
import { useCardAnimations } from "./useCardAnimations";

export const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const { animateOpenCards } = useCardAnimations(setCards);

  const addCard = useCallback((selectedValue: CardValue) => {
    const newCard = createCard(selectedValue);
    setCards(prev => [...prev, newCard]);
  }, []);

  const openAllCards = useCallback(() => {
    const totalDelay = animateOpenCards(cards);

    // 最後のカードが開いた後にソートを実行
    setTimeout(() => {
      const sortedCards = sortCards(cards);
      setCards(sortedCards);
    }, totalDelay + 500);
  }, [cards, animateOpenCards]);

  const resetCards = useCallback(() => {
    setCards([]);
  }, []);

  return {
    cards,
    addCard,
    openAllCards,
    resetCards,
  };
};
