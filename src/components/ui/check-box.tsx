import { Root, Indicator, CheckboxProps } from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import { Check } from 'lucide-react';
import { Paragraph } from './paragraph';

interface ICheckboxProps extends CheckboxProps {
  label?: string;
  size?: number;
  labelClassName?: string;
  className?: string;
}
export const Checkbox = ({
  label,
  size = 20,
  labelClassName,
  className,
  ...props
}: ICheckboxProps) => {
  return (
    <div className="flex items-center gap-4">
      <Root
        className={clsx(
          ` flex items-center justify-center appearance-none rounded bg-white border border-gray-800 outline-none data-[state=checked]:bg-primary data-[state=checked]:border data-[state=checked]:border-none disabled:bg-gray`,
          className
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        <Indicator>
          <Check color="#fff" size={18} />
        </Indicator>
      </Root>
      {label && <Paragraph className={labelClassName}>{label}</Paragraph>}
    </div>
  );
};
