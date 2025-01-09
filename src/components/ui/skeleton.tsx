import clsx from 'clsx';
import React, { CSSProperties } from 'react';

interface ISkeletonProps {
  className?: string;
  style?: CSSProperties;
}

const Skeleton = ({ className, style }: ISkeletonProps) => {
  return (
    <div
      style={style}
      className={clsx(`bg-slate-200 animate-pulse rounded-lg`, className)}
    />
  );
};

export default Skeleton;
