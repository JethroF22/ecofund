import React, { ReactElement } from "react";

import Navbar from "../components/common/Navbar";

interface Props {
  children: JSX.Element;
}

const Home = ({ children }: Props): ReactElement<Props> => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Navbar />
      {children}
    </div>
  );
};

export default Home;
