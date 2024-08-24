import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTopicStore } from "../store/topic";
import TopicCard from "../components/TopicCard";

const HomePage = () => {
  const { fetchTopics, topics } = useTopicStore();

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);
  // console.log("topics", topics);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"25"}
          fontWeight={"semibold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Terms and Definitions 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {topics.map((topic) => (
            <TopicCard key={topic._id} topic={topic} />
          ))}
        </SimpleGrid>

        {topics.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No terms found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a term
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
