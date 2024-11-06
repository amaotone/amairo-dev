import { Button, HStack } from "@chakra-ui/react";
import { Idea01Icon, NextIcon } from "hugeicons-react";

type ActionButtonsProps = {
  onOpenAll: () => void;
  onNext: () => void;
  disabled: boolean;
};

export const ActionButtons = ({
  onOpenAll,
  onNext,
  disabled,
}: ActionButtonsProps) => {
  return (
    <HStack gap={4} justify="center">
      <Button
        onClick={onOpenAll}
        disabled={disabled}
        colorScheme="brand"
        size="md"
        width="140px"
        leftIcon={<Idea01Icon size={20} />}
      >
        Open
      </Button>
      <Button
        onClick={onNext}
        disabled={disabled}
        colorScheme="brand"
        variant="outline"
        size="md"
        width="140px"
        leftIcon={<NextIcon size={20} />}
      >
        Next
      </Button>
    </HStack>
  );
};
