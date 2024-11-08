import { Box, Button, useClipboard, useToast } from "@chakra-ui/react";
import { Cards01Icon, Share08Icon } from "hugeicons-react";
import Link from "next/link";

export const Header: React.FC = () => {
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
			p={2}
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
					size="sm"
					fontSize="md"
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
				leftIcon={<Share08Icon size={16} />}
			>
				Share
			</Button>
		</Box>
	);
};
