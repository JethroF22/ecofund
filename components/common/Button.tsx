import React from "react";

interface Props {
  onClick(): void;
  children: JSX.Element;
  className?: string;
}

function Button(props: Props) {
  const baseClassName =
    "text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 rounded py-3 px-5";
  const className = props.className
    ? `${baseClassName} ${props.className}`
    : baseClassName;
  return (
    <button type="button" className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
