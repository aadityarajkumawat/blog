import {
  Box,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import PostIcon1 from "../assets/post_icon1.svg";

enum Page {
  Latest,
  Recent,
}

const recentPosts = [
  "Server Side Optimizations, in Remix JS",
  "React URQL and Typescript setup",
  "Handle forms in Remix, using Form component",
  "I have no idea what to do",
  "This is the best blog someone will ever read",
  "Server Side Optimizations, in Remix JS",
];

export default function Index() {
  const [state, setState] = useState<Page>(Page.Latest);

  return (
    <Box
      as={motion.div}
      onWheel={(e) => {
        if (e.deltaY > 0) {
          setState(Page.Recent);
        } else {
          setState(Page.Latest);
        }
      }}
    >
      <Navbar />
      {state === Page.Latest ? (
        <VStack
          alignItems="flex-start"
          mx={"24"}
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Text fontSize="5xl" fontWeight="bold" textDecoration="underline">
            Lastest Release
          </Text>

          <Text fontSize="4xl">Server Side Optimizations in Remix</Text>

          <HStack py={"20"}>
            <Image src={PostIcon1} />
            <Text px="52" fontSize={"3xl"} textAlign="justify">
              If you're looking for random paragraphs, you've come to the right
              place. When a random word or a random sentence isn't quite enough,
              the next logical step is to find a random paragraph. We created
              the Random Paragraph Generator with you in mind. The process is
              quite simple. Choose the number of random paragraphs you'd like to
              see and click the button. Your chosen number of paragraphs will
              instantly appear. While it may not be obvious to everyone, there
              are a number of reasons creating random paragraphs can be useful.
              A few examples of how some people use this generator are listed in
              the following paragraphs.
            </Text>
          </HStack>
        </VStack>
      ) : (
        <VStack
          alignItems="flex-start"
          mx={"24"}
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Text fontSize="5xl" fontWeight="bold" textDecoration="underline">
            Recent Posts
          </Text>

          <HStack py={"24"} justifyContent="space-between" w={"full"}>
            <List>
              {recentPosts.map((p) => (
                <ListItem
                  cursor={"pointer"}
                  fontSize={"3xl"}
                  my={4}
                  _hover={{ color: "purple", textDecoration: "underline" }}
                >
                  {p}
                </ListItem>
              ))}
            </List>
            <Image src={PostIcon1} />
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
