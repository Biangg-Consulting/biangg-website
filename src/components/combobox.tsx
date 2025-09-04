"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Badge } from "./ui/badge";

type ComboboxProps = {
  data: Array<{ value: string; label: string; icon?: React.ReactNode }>;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  emptyMessage?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  disabled?: boolean;
  multiple?: boolean;
  countable?: boolean;
};

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      data,
      value,
      onChange,
      placeholder = "Select an option...",
      inputPlaceholder = "Search...",
      emptyMessage = "No options found.",
      buttonClassName,
      popoverClassName,
      disabled = false,
      multiple = false,
      countable = false,
    }: ComboboxProps,
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string[]>(
      Array.isArray(value) ? value : []
    );

    const isControlled = value !== undefined;
    const selectedValue = isControlled
      ? Array.isArray(value)
        ? value
        : [value]
      : internalValue;

    const handleSelect = (currentValue: string) => {
      let newValue: string[];
      if (multiple) {
        newValue = selectedValue.includes(currentValue)
          ? selectedValue.filter((item) => item !== currentValue)
          : [...selectedValue, currentValue];
      } else {
        newValue = currentValue === selectedValue[0] ? [] : [currentValue];
      }

      if (isControlled) {
        onChange?.(multiple ? newValue : newValue[0]);
      } else {
        setInternalValue(newValue);
      }
    };

    const selectedLabels = data.filter((item) =>
      selectedValue.includes(item.value)
    );

    return (
      <div className="flex flex-col gap-5 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", buttonClassName)}
              disabled={disabled}
            >
              {selectedLabels.length > 0
                ? countable
                  ? selectedLabels[0]?.label
                  : selectedLabels.map((item) => item.label).join(", ")
                : placeholder}

              <div className="flex gap-2 items-center">
                {countable && selectedLabels.length > 1 && (
                  <div className="bg-primary rounded-sm w-[22px] h-[22px] flex items-center justify-center">
                    <span className="text-[11px] text-white">
                      {selectedLabels.length - 1}+
                    </span>
                  </div>
                )}
                <ChevronsUpDown className="opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-full p-0", popoverClassName)}>
            <Command>
              <CommandInput placeholder={inputPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => handleSelect(item.value)}
                    >
                      {item?.icon && item.icon}
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedValue.includes(item.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* {multiple && selectedLabels.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedLabels.map((item) => (
              <Badge
                variant="secondary"
                key={item.value}
                className="flex gap-3"
              >
                <span>{item.label}</span>
                <X
                  size={15}
                  className="cursor-pointer text-red-600 font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item.value);
                  }}
                />
              </Badge>
            ))}
          </div>
        )} */}
      </div>
    );
  }
);
