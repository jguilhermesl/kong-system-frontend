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
}

const TBodyRowComponent = ({
  children,
  isEven,
  onSelectedRow,
  onClick,
}: ITBodyRowProps) => {
  return (
    <tr
      className={clsx('w-full', {
        'bg-gray-50 w-full': isEven,
      })}
      onClick={onClick}
    >
      {/* {!!onSelectedRow?.onChecked && (
        <Table.Col>
          <Checkbox
            onCheckedChange={() =>
              !!onSelectedRow?.onChecked &&
              onSelectedRow?.onChecked(onSelectedRow.rowId)
            }
          />
        </Table.Col>
      )} */}
      {children}
    </tr>
  );
};

TBodyRowComponent.displayName = 'TBodyRow';

export const TBodyRow = memo(TBodyRowComponent);
