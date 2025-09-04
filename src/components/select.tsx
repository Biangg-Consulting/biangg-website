import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function CustomSelect({
  options,
  label,
  placeholder,
  className,
  defaultValue,
  value,
  onChange,
}: CustomSelectProps) {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onChange}>
      <SelectTrigger className={className || "w-[180px]"}>
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
