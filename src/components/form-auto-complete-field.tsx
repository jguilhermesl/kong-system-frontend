/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { Paragraph } from './ui/paragraph';
import { AutoCompleteInput } from './ui/auto-complete';

interface IFormAutoCompleteFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  setItem: Dispatch<SetStateAction<string>>;
  suggestions: any[];
  getItems: (value: string) => Promise<void>;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  error?: string;
  renderKeys?: string[];
}

export const FormAutoCompleteField = ({
  value,
  label,
  description,
  className,
  error,
  setItem,
  setValue,
  suggestions,
  getItems,
  renderKeys,
  ...props
}: IFormAutoCompleteFieldProps) => {
  return (
    <div className={className}>
      {label && <Paragraph className="font-medium mb-2">{label}</Paragraph>}
      <AutoCompleteInput
        {...props}
        setItem={setItem}
        suggestions={suggestions}
        setValue={setValue}
        getItems={getItems}
        value={value}
        renderKeys={renderKeys}
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
