import React, { ReactElement } from "react";

interface Props {
  children: JSX.Element;
}

const Container = ({ children }: Props): ReactElement<Props> => {
  return (
    <div className="w-screen h-screen flex items-start justify-center overflow-auto bg-neutral-200">
      {children}
    </div>
  );
};

export default Container;
