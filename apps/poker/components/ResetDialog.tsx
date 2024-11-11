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

	const handleReset = () => {
		onReset();
		onClose();
	};

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
						次のラウンドを開始しますか？
					</AlertDialogHeader>
					<AlertDialogBody>全てのカードがリセットされます。</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							キャンセル
						</Button>
						<Button colorScheme="brand" onClick={handleReset} ml={3}>
							開始
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
