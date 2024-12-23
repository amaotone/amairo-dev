import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ResetDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onReset: () => void;
}

export const ResetDialog = ({ isOpen, onClose, onReset }: ResetDialogProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent mx={4}>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Are you sure?
					</AlertDialogHeader>
					<AlertDialogBody>This will reset all cards.</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="brand" onClick={onReset} ml={3}>
							Next
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
