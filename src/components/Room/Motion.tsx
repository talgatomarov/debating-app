import React from "react";
import { Box, Container } from "@material-ui/core";

type Props = {
  motionText: string;
};

export default function Motion(props: Props) {
  return (
    <Container maxWidth="sm">
      <Box color="black" margin="5px" fontSize={20}>
        {props.motionText}
      </Box>
    </Container>
  );
}
