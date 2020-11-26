import React, { useState } from "react";
import {
  IconButton,
  Box,
  Container,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Link, FileCopy } from "@material-ui/icons";

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
