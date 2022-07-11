import React from "react";

interface Props {
  onClick(): void;
  text: string;
}

function Button({ onClick, text }: Props) {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 rounded py-3 px-5"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
