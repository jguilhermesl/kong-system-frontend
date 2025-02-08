/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import clsx from 'clsx';
import { ReactNode, memo } from 'react';

interface ITBodyRowProps {
  children?: ReactNode;
  isEven?: boolean;
  onSelectedRow?: {
    rowId: string;
    onChecked?: (rowId: string) => void;
  };
  onClick?: () => void;
  isPending?: boolean;
}

const TBodyRowComponent = ({
  children,
  isEven,
  onSelectedRow,
  isPending,
  onClick,
}: ITBodyRowProps) => {
  return (
    <tr
      className={clsx('w-full', {
        'bg-gray-50 w-full': isEven,
        'bg-orange-100': isPending,
      })}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

TBodyRowComponent.displayName = 'TBodyRow';

export const TBodyRow = memo(TBodyRowComponent);
