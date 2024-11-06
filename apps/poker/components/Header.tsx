import {
	Box,
	Button,
	HStack,
	Heading,
	useClipboard,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { Cards01Icon, Share01Icon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { onCopy } = useClipboard(
		typeof window !== "undefined" ? window.location.href : "",
	);

	const handleShareClick = () => {
		onCopy();
		toast({
			title: "URL copied!",
			status: "success",
			colorScheme: "brand",
			duration: 2000,
			position: "top",
		});
	};

	return (
		<Box
			py={2}
			px={8}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			h="60px"
			flexShrink={0}
		>
			<Link href="/" passHref style={{ textDecoration: "none" }}>
				<Button
					as="span"
					colorScheme="brand"
					size="md"
					variant="ghost"
					leftIcon={<Cards01Icon size={24} />}
					fontWeight="bold"
				>
					PlanningPoker
				</Button>
			</Link>
			<Button
				colorScheme="brand"
				variant="ghost"
				size="sm"
				onClick={handleShareClick}
				leftIcon={<Share01Icon size={16} />}
			>
				Share
			</Button>
		</Box>
	);
};
