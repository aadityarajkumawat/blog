import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface PostCardProps {
  title: string;
  desc: string;
  image: string;
}

export function PostCard(props: PostCardProps) {
  return (
    <HStack w="full" alignItems="flex-start" spacing={5}>
      <Box
        w={300}
        h={170}
        borderWidth={1}
        borderColor="black"
        borderRadius="md"
        bgColor="#FFA3FF"
      ></Box>

      <VStack alignItems="flex-start" spacing={2} w="calc(100% - 340px)">
        <Text
          fontSize={26}
          fontWeight="700"
          lineHeight={1.1}
          cursor="pointer"
          _hover={{ textDecor: "underline" }}
        >
          {props.title}
        </Text>
        <Text textAlign="justify">{props.desc}</Text>
      </VStack>
    </HStack>
  );
}
