import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link01Icon } from "hugeicons-react";
import { useRouter } from "next/router";
import { useRef } from "react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleShareService = () => {
    navigator.clipboard.writeText(window.location.origin);
    onClose();
  };

  const handleShareRoom = () => {
    navigator.clipboard.writeText(window.location.href);
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
            Copy URL
          </AlertDialogHeader>
          <AlertDialogBody></AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
            <HStack spacing={4}>
              <Button
                colorScheme="gray"
                onClick={handleShareRoom}
                leftIcon={<Link01Icon />}
              >
                Room
              </Button>
              <Button
                colorScheme="gray"
                onClick={handleShareService}
                leftIcon={<Link01Icon />}
              >
                Service
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
