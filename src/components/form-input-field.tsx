/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from './ui/input';
import { Paragraph } from './ui/paragraph';
import clsx from 'clsx';

interface IFormInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (e: any) => void;
  value?: string;
  iconRight?: ReactNode;
  error?: string;
}

export const FormInputField = ({
  value,
  label,
  placeholder,
  description,
  className,
  onChange,
  iconRight,
  error,
  inputClassName,
  ...props
}: IFormInputFieldProps) => {
  return (
    <div className={className}>
      {label && <Paragraph className="font-medium">{label}</Paragraph>}
      <Input
        {...props}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={clsx('mt-2 mb-2', inputClassName)}
        iconRight={iconRight}
      />
      {description && (
        <Paragraph className="text-xs text-muted-foreground">
          {description}
        </Paragraph>
      )}
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};
