import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  ChildrenclassName?: string;
  className?: string;
};

const Card = ({ children, title, className, ChildrenclassName }: Props) => {
  return (
    <div
      className={clsx(
        className,
        "p-4 gap-3 w-full rounded-xl shadow-md  dark:bg-zinc-800"
      )}
    >
      <h1 className="text-2xl mb-3  font-semibold">{title}</h1>
      <div
        className={clsx(
          ChildrenclassName,
          "animate-[fade-in_3s_ease-out_forwards]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
