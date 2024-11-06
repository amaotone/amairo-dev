import { useCallback } from "react";
import type { CardType } from "../types";

export const useCardAnimations = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
) => {
  const animateOpenCards = useCallback(
    (cards: CardType[]) => {
      let delay = 0;
      cards.forEach((card, index) => {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.id === card.id ? { ...c, isOpen: true } : c)),
          );
        }, delay);
        delay += 50;
      });
      return delay;
    },
    [setCards],
  );

  return {
    animateOpenCards,
  };
};
