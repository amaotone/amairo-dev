import { Avatar, Box, keyframes } from "@chakra-ui/react";

interface Props {
  name: string;
  src: string;
  bgColor: string;
  size: string;
}

const pulseRing = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.33);
  }
  40%, 50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const PulseAvatar: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Box
        as="div"
        position="relative"
        w={props.size}
        h={props.size}
        borderRadius="50%"
        boxShadow="base"
        _before={{
          content: "''",
          position: "relative",
          display: "block",
          width: "300%",
          height: "300%",
          boxSizing: "border-box",
          marginLeft: "-100%",
          marginTop: "-100%",
          borderRadius: "50%",
          bgColor: props.bgColor,
          animation: `3s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}
      >
        <Avatar
          name={props.name}
          src={props.src}
          size="full"
          position="absolute"
          top={0}
          loading="eager"
          ignoreFallback
        />
      </Box>
    </>
  );
};
