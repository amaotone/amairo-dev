import { Box, Button, HStack, Heading, useDisclosure } from "@chakra-ui/react";
import { Cards01Icon, Share01Icon } from "hugeicons-react";
import { useRouter } from "next/router";
import { ShareDialog } from "./ShareDialog";

export const Header: React.FC = () => {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleLogoClick = () => {
		router.push("/");
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
			<Button
				colorScheme="brand"
				size="md"
				variant="ghost"
				onClick={handleLogoClick}
				leftIcon={<Cards01Icon size={24} />}
				fontWeight="bold"
			>
				PlanningPoker
			</Button>
			<Button
				colorScheme="brand"
				variant="ghost"
				size="sm"
				onClick={onOpen}
				leftIcon={<Share01Icon size={16} />}
			>
				Share
			</Button>
			<ShareDialog isOpen={isOpen} onClose={onClose} />
		</Box>
	);
};
