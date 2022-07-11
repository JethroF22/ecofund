import React, { ReactElement } from "react";

interface Props {
  children: JSX.Element;
}

const Container = ({ children }: Props): ReactElement<Props> => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-blue-500 flex items-start justify-center">
      {children}
    </div>
  );
};

export default Container;
