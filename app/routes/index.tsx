import { Box, Text } from "@chakra-ui/react";
import { Layout } from "~/components/Layout";
import { Navbar } from "~/components/Navbar";
import { PostCard } from "~/components/PostCard";

const data = {
  latest: {
    id: 1,
    title: "How to do the fastest server side rendering.",
    desc: "Lorem this is a cool, thing that everyone should learn is a cool, thing that everyone should learn this is a cool, thing that everyone should learn is a cool, thing that everyone should",
    image: "",
  },
  recent: [
    {
      id: 2,
      title: "How to do the fastest server side rendering.",
      desc: "Lorem this is a cool, thing that everyone should learn is a cool, thing that everyone should learn this is a cool, thing that everyone should learn is a cool, thing that everyone should",
      image: "",
    },
    {
      id: 3,
      title: "How to do the fastest server side rendering.",
      desc: "Lorem this is a cool, thing that everyone should learn is a cool, thing that everyone should learn this is a cool, thing that everyone should learn is a cool, thing that everyone should",
      image: "",
    },
    {
      id: 4,
      title: "How to do the fastest server side rendering.",
      desc: "Lorem this is a cool, thing that everyone should learn is a cool, thing that everyone should learn this is a cool, thing that everyone should learn is a cool, thing that everyone should",
      image: "",
    },
    {
      id: 5,
      title: "How to do the fastest server side rendering.",
      desc: "Lorem this is a cool, thing that everyone should learn is a cool, thing that everyone should learn this is a cool, thing that everyone should learn is a cool, thing that everyone should",
      image: "",
    },
  ],
};

export default function Index() {
  return (
    <Layout>
      <Navbar />
      <Box px={10}>
        <Text mt={8} fontSize={32} fontWeight="700" textDecor="underline">
          Latest Post
        </Text>

        <Box mt={4}>
          <PostCard {...data.latest} />
        </Box>

        <Text mt={8} fontSize={32} fontWeight="700" textDecor="underline">
          Recent Posts
        </Text>

        <Box pb={8}>
          {data.recent.map((post, i) => (
            <Box mt={6} key={i}>
              <PostCard {...post} />
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
