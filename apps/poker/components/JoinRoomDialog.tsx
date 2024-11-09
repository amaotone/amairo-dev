import {
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { updateMember } from "../utils/room";

interface Props {
	isOpen: boolean;
	roomId: string;
	userId: string;
	onJoin: () => void;
}

export const JoinRoomDialog = ({ isOpen, roomId, userId, onJoin }: Props) => {
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		setIsLoading(true);
		try {
			await updateMember(roomId, userId, {
				name: name.trim(),
				selectedCard: null,
			});
			onJoin();
		} catch (error) {
			console.error("Failed to join room:", error);
			toast({
				title: "Failed to join room",
				status: "error",
				position: "top",
				duration: 3000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {}}
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent as="form" onSubmit={handleSubmit} mx="4">
				<ModalHeader>Join Room</ModalHeader>
				<ModalBody>
					<FormControl isRequired>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Your name"
							autoFocus
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						type="submit"
						colorScheme="brand"
						isLoading={isLoading}
						isDisabled={!name.trim()}
					>
						Join
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
