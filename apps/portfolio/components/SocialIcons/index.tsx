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
  variant?: string;
  colorScheme?: string;
}

export const SocialIcons: React.FC<Props> = (props: Props) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Link href="https://twitter.com/SakuEji" isExternal>
        <IconButton
          aria-label="logo-twitter"
          variant={props.variant ?? "ghost"}
          colorScheme={props.colorScheme ?? "teal"}
          isRound
          fontSize={props.fontSize ?? "3xl"}
          icon={<Icon as={RiTwitterFill} />}
        />
      </Link>
      <Link href="https://github.com/amaotone" isExternal>
        <IconButton
          aria-label="logo-github"
          variant={props.variant ?? "ghost"}
          colorScheme={props.colorScheme ?? "teal"}
          isRound
          fontSize={props.fontSize ?? "3xl"}
          icon={<Icon as={RiGithubFill} />}
        />
      </Link>
      <Link href="https://amalog.hateblo.jp" isExternal>
        <IconButton
          aria-label="logo-blog"
          variant={props.variant ?? "ghost"}
          colorScheme={props.colorScheme ?? "teal"}
          isRound
          fontSize={props.fontSize ?? "3xl"}
          icon={<Icon as={RiArticleFill} />}
        />
      </Link>
      <Link href="https://facebook.com/amane.suzu" isExternal>
        <IconButton
          aria-label="logo-facebook"
          variant={props.variant ?? "ghost"}
          colorScheme={props.colorScheme ?? "teal"}
          isRound
          fontSize={props.fontSize ?? "3xl"}
          icon={<Icon as={RiFacebookBoxFill} />}
        />
      </Link>
      <Link href="https://speakerdeck.com/amaotone" isExternal>
        <IconButton
          aria-label="logo-speakerdeck"
          variant={props.variant ?? "ghost"}
          colorScheme={props.colorScheme ?? "teal"}
          isRound
          fontSize={props.fontSize ?? "3xl"}
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
};
