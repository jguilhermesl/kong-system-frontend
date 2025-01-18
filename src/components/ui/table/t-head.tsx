import clsx from 'clsx';
import { Paragraph } from '../paragraph';

interface ITableHeadProps {
  className?: string;
  headers?: string[];
  showColumnSortButton?: string[];
  onSortItems?: (header: string) => void;
}

export const THead = ({
  className,
  headers,
  showColumnSortButton,
  onSortItems,
}: ITableHeadProps) => {
  return (
    <thead className="table-header-group shadow-inset-bottom !rounded-lg w-full flex-1">
      <tr
        className={clsx(
          'text-left table-row align-middle sticky top-0 shadow-sm !rounded-lg bg-neutral-100 border border-neutral-200 w-full flex-1 right-0',
          className
        )}
      >
        {headers?.map((header, i) => (
          <th key={i} className="p-2 font-semibold table-cell truncate">
            <span className="flex items-center justify-between">
              <Paragraph className="flex !text-neutral-900">{header}</Paragraph>

              {showColumnSortButton?.includes(header) && onSortItems && (
                <button>sort</button>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
