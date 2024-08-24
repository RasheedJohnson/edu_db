import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTopicStore } from "../store/topic";

const CreatePage = () => {
  const [newTopic, setNewTopic] = useState({
    term: "",
    definition: "",
    book: "Developmental Psychology Childhood and Adolescence",
    chapter: "",
  });
  const toast = useToast();

  const { createTopic } = useTopicStore();

  const handleAddTopic = async () => {
    const { success, message } = await createTopic(newTopic);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewTopic({ term: "", definition: "", book: "", chapter: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Term
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Term"
              name="term"
              value={newTopic.term}
              onChange={(e) =>
                setNewTopic({ ...newTopic, term: e.target.value })
              }
            />
            <Textarea
              placeholder="Definition"
              name="definition"
              height={36}
              value={newTopic.definition}
              onChange={(e) =>
                setNewTopic({ ...newTopic, definition: e.target.value })
              }
            />
            <Textarea
              placeholder="Book"
              name="book"
              height={24}
              value={newTopic.book}
              onChange={(e) =>
                setNewTopic({ ...newTopic, book: e.target.value })
              }
            />
            <Input
              placeholder="Chapter number"
              name="chapter"
              type="number"
              value={newTopic.chapter}
              onChange={(e) =>
                setNewTopic({ ...newTopic, chapter: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddTopic} w="full">
              Add
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
