// components/ui/Input.tsx
interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  className = '',
  type = 'text',
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
};