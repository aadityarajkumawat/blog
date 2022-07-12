import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <Box
      w="50vw"
      borderLeft="1px solid black"
      borderRight="1px solid black"
      margin="auto"
    >
      {props.children}
    </Box>
  );
}
