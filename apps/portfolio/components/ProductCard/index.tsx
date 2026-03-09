import {
	Box,
	Heading,
	Icon,
	IconButton,
	Image,
	Link,
	LinkBox,
	LinkOverlay,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import { FaApple } from "react-icons/fa";
import { RiArticleLine, RiCodeLine, RiExternalLinkLine } from "react-icons/ri";
import { portfolioCardStyle, portfolioTagRowStyle } from "../cardStyles";

interface Props {
	title: string;
	text: string;
	link: string;
	blog?: string;
	code?: string;
	image?: string;
	tags?: Array<string>;
}

export const ProductCard: React.FC<Props> = (props: Props) => {
	const { title, text, link, blog, code, image, tags } = props;
	const isAppStoreLink = link.includes("apps.apple.com");

	return (
		<LinkBox {...portfolioCardStyle} h="full">
			<Box borderBottomWidth="1px" borderColor="blackAlpha.100">
				<Image
					src={image || "https://via.placeholder.com/800x450.png"}
					alt={`${title} preview`}
					w="full"
					h="184px"
					objectFit="cover"
				/>
			</Box>
			<Stack p={6} spacing={4} justify="space-between" minH="260px">
				<Box>
					<Heading color="gray.700" size="md" fontWeight={700} mb={3}>
						<LinkOverlay href={link} isExternal>
							{title}
						</LinkOverlay>
					</Heading>
					<Text color="gray.600" fontSize="sm" lineHeight={1.8}>
						{text}
					</Text>
				</Box>
				{tags && (
					<Stack {...portfolioTagRowStyle}>
						{tags.map((tag) => {
							return (
								<Tag size="sm" colorScheme="teal" key={tag}>
									{tag}
								</Tag>
							);
						})}
					</Stack>
				)}
				<Stack direction="row" justify="flex-end" spacing={1}>
					{link && (
						<Link href={link} isExternal>
							<IconButton
								aria-label={title}
								colorScheme="teal"
								variant="ghost"
								isRound
								p={1}
								icon={
									<Icon
										as={isAppStoreLink ? FaApple : RiExternalLinkLine}
										w={4}
										h={4}
									/>
								}
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
			</Stack>
		</LinkBox>
	);
};
