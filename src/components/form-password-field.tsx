import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Input } from './ui/input';
import { Paragraph } from './ui/paragraph';
import { Eye, EyeOff } from 'lucide-react';

interface IFormInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  onChange?: (e: any) => void;
  value?: string;
  iconRight?: ReactNode;
  error?: string;
}

export const FormPasswordField = ({
  value,
  label,
  placeholder,
  description,
  className,
  onChange,
  iconRight,
  error,
  ...props
}: IFormInputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      {label && <Paragraph className="font-medium">{label}</Paragraph>}
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="mt-2 mb-2"
        iconRight={
          showPassword ? (
            <Eye
              className="cursor-pointer"
              size={16}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <EyeOff
              className="cursor-pointer"
              size={16}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          )
        }
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
