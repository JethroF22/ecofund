import React from "react";
import type { NextPage } from "next";

import BasePage from "../components/BasePage";
import Container from "../components/common/Container";

const Home: NextPage = () => {
  return (
    <Container>
      <BasePage>
        <p className="text-2xl">Home</p>
      </BasePage>
    </Container>
  );
};

export default Home;
