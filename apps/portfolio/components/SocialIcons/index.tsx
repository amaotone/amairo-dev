import { Icon, IconButton, Link, Stack } from "@chakra-ui/react";
import { FaSpeakerDeck } from "react-icons/fa";
import {
  RiArticleFill,
  RiFacebookBoxFill,
  RiGithubFill,
  RiTwitterFill,
} from "react-icons/ri";

interface Props {
  fontSize?: string;
  isRound?: boolean;
  variant?: string;
  colorScheme?: string;
}

export const SocialIcons: React.FC<Props> = (props: Props) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Link href="https://twitter.com/SakuEji" isExternal>
        <IconButton
          aria-label="logo-twitter"
          variant={props.variant}
          colorScheme={props.colorScheme}
          isRound={props.isRound}
          fontSize={props.fontSize}
          icon={<Icon as={RiTwitterFill} />}
        />
      </Link>
      <Link href="https://github.com/amaotone" isExternal>
        <IconButton
          aria-label="logo-github"
          variant={props.variant}
          colorScheme={props.colorScheme}
          isRound={props.isRound}
          fontSize={props.fontSize}
          icon={<Icon as={RiGithubFill} />}
        />
      </Link>
      <Link href="https://amalog.hateblo.jp" isExternal>
        <IconButton
          aria-label="logo-blog"
          variant={props.variant}
          colorScheme={props.colorScheme}
          isRound={props.isRound}
          fontSize={props.fontSize}
          icon={<Icon as={RiArticleFill} />}
        />
      </Link>
      <Link href="https://facebook.com/amane.suzu" isExternal>
        <IconButton
          aria-label="logo-facebook"
          variant={props.variant}
          colorScheme={props.colorScheme}
          isRound={props.isRound}
          fontSize={props.fontSize}
          icon={<Icon as={RiFacebookBoxFill} />}
        />
      </Link>
      <Link href="https://speakerdeck.com/amaotone" isExternal>
        <IconButton
          aria-label="logo-speakerdeck"
          variant={props.variant}
          colorScheme={props.colorScheme}
          isRound={props.isRound}
          fontSize={props.fontSize}
          icon={<Icon as={FaSpeakerDeck} />}
        />
      </Link>
    </Stack>
  );
};

SocialIcons.defaultProps = {
  fontSize: "3xl",
  colorScheme: "teal",
  variant: "ghost",
  isRound: true,
};
