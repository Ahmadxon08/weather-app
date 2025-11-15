// ui/skeleton.tsx

type Props = {
  className?: string;
};

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={`bg-gray-700 dark:bg-gray-500 animate-pulse ${className}`}
    />
  );
};
