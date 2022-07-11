import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Me from "../assets/me.jpg";

export function Navbar() {
  return (
    <Flex justifyContent={"space-between"} alignItems="center" px={24} py={4}>
      <Text fontSize="xl">Aditya's Blog</Text>
      <Box
        as={motion.div}
        initial="initial"
        animate="fadein"
        variants={{ initial: { opacity: 0 }, fadein: { opacity: 1 } }}
      >
        <Image src={Me} w={12} borderRadius="full" />
      </Box>
    </Flex>
  );
}
