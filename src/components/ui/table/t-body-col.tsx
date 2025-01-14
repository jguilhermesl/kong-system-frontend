import { ReactNode, memo } from 'react';
import clsx from 'clsx';

interface ITBodyColProps {
  children?: ReactNode;
  description?: string;
  quantity?: number;
  className?: string;
}

const TBodyColComponent = ({
  children,
  description,
  quantity,
  className,
}: ITBodyColProps) => {
  return (
    <td className={clsx('px-3 py-4 text-sm', className)}>
      {children}
      {description && <p className="text-gray-600">{description}</p>}
      {quantity !== undefined && (
        <p className="text-gray-600 ml-1">
          <strong>({quantity})</strong>
        </p>
      )}
    </td>
  );
};

TBodyColComponent.displayName = 'TBodyCol';

export const TBodyCol = memo(TBodyColComponent);
