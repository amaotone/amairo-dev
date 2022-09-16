import { keyframes } from "@chakra-ui/react";

const blurAnime = keyframes`
  from {
    filter: blur(10px);
    transform: scale(1.02);
  }
  
  to {
    filter: blur(0);
    transform: scale(1);
  }
`;

export const blurAppearance = {
  animation: `1s ${blurAnime}`,
};
