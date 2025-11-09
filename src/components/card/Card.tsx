import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  ChildrenclassName?: string;
};

const Card = ({ children, title, ChildrenclassName }: Props) => {
  return (
    <div className="p-4 gap-3  w-full rounded-xl shadow-md  bg-zinc-800">
      <h1 className="text-2xl mb-3 text-white font-semibold">{title}</h1>
      <div className={ChildrenclassName}>{children}</div>
    </div>
  );
};

export default Card;
