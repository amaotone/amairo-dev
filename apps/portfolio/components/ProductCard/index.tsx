import {
  Badge,
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiArticleLine, RiCodeLine, RiExternalLinkLine } from "react-icons/ri";

interface Props {
  title: string;
  text: string;
  link: string;
  blog?: string;
  code?: string;
  image?: string;
  badges?: Array<string>;
}

export const ProductCard: React.FC<Props> = (props: Props) => {
  const { title, text, link, blog, code, image, badges } = props;
  return (
    <LinkBox boxShadow={"base"} bg="white">
      <Box boxShadow="sm">
        <Image
          src={image || "https://via.placeholder.com/800x450.png"}
          alt="placeholder"
        />
      </Box>
      <Stack p={6} pb={3} justify={"center"}>
        <Heading color={"gray.700"} size={"md"}>
          <LinkOverlay href={link} isExternal>
            {title}
          </LinkOverlay>
        </Heading>
        <Text color={"gray.500"} fontSize={"sm"}>
          {text}
        </Text>
        {badges && (
          <Stack direction={"row"}>
            {badges.map(badge => {
              return <Badge colorScheme="teal">{badge}</Badge>;
            })}
          </Stack>
        )}
        <Box>
          <Center>
            <Stack direction={"row"}>
              {link && (
                <Link href={link} isExternal>
                  <IconButton
                    aria-label={title}
                    colorScheme="teal"
                    variant="ghost"
                    isRound
                    p={1}
                    icon={<Icon as={RiExternalLinkLine} w={4} h={4} />}
                  />
                </Link>
              )}
              {blog && (
                <Link href={blog} isExternal>
                  <IconButton
                    aria-label="blog"
                    colorScheme="teal"
                    variant="ghost"
                    isRound
                    p={1}
                    icon={<Icon as={RiArticleLine} w={4} h={4} />}
                  />
                </Link>
              )}
              {code && (
                <Link href={code} isExternal>
                  <IconButton
                    aria-label="code"
                    colorScheme="teal"
                    variant="ghost"
                    isRound
                    p={1}
                    icon={<Icon as={RiCodeLine} w={4} h={4} />}
                  />
                </Link>
              )}
            </Stack>
          </Center>
        </Box>
      </Stack>
    </LinkBox>
  );
};
