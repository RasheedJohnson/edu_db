import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useTopicStore } from "../store/topic";
import { useState } from "react";
import PropTypes from "prop-types";

const TopicCard = ({ topic }) => {
  const [updatedTopic, setUpdatedTopic] = useState(topic);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteTopic, updateTopic } = useTopicStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTopic = async (pid) => {
    const { success, message } = await deleteTopic(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateTopic = async (pid, updatedTopic) => {
    const { success, message } = await updateTopic(pid, updatedTopic);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Topic updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4}>
        <Heading
          as="h3"
          size="md"
          mb={2}
          _firstLetter={{ textTransform: "uppercase" }}
        >
          {topic.term}
        </Heading>

        <Text
          fontSize="md"
          color={textColor}
          mb={4}
          _firstLetter={{ textTransform: "uppercase" }}
        >
          {topic.definition}
        </Text>

        <HStack className="flex justify-between" spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteTopic(topic._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Topic term"
                name="term"
                value={updatedTopic.term}
                onChange={(e) =>
                  setUpdatedTopic({ ...updatedTopic, term: e.target.value })
                }
              />
              <Textarea
                placeholder="Definition"
                name="definition"
                height={36}
                type="text"
                value={updatedTopic.definition}
                onChange={(e) =>
                  setUpdatedTopic({
                    ...updatedTopic,
                    definition: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Book"
                name="book"
                height={24}
                type="text"
                value={updatedTopic.book}
                onChange={(e) =>
                  setUpdatedTopic({ ...updatedTopic, book: e.target.value })
                }
              />
              <Input
                placeholder="Chapter"
                name="chapter"
                value={updatedTopic.chapter}
                onChange={(e) =>
                  setUpdatedTopic({ ...updatedTopic, chapter: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateTopic(topic._id, updatedTopic)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
TopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
};

export default TopicCard;
