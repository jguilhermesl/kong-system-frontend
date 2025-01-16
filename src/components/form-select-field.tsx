import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Paragraph } from './ui/paragraph';
import clsx from 'clsx';

interface IFormSelectFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  choices: {
    value: string;
    label: string;
  }[];
  containerClassName?: string;
}

export const FormSelectField = ({
  label,
  placeholder,
  description,
  onChange,
  value,
  choices,
  className,
  containerClassName,
}: IFormSelectFieldProps) => {
  return (
    <div className={className}>
      {label && <Paragraph className="font-medium">{label}</Paragraph>}
      <Select onValueChange={onChange} defaultValue={value} value={value}>
        <SelectTrigger
          className={clsx('my-2', containerClassName)}
          value={value}
        >
          <SelectValue placeholder={placeholder} defaultValue={value} />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => {
            return (
              <SelectItem key={choice.value} value={choice.value}>
                {choice.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {description && (
        <Paragraph className="text-xs text-muted-foreground">
          {description}
        </Paragraph>
      )}
    </div>
  );
};
