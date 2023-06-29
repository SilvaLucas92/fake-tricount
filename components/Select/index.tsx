import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface SelectProps {
  data: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  name: string;
}

const Select = ({
  data,
  placeholder,
  value,
  onChange,
  label,
  name,
}: SelectProps) => (
  <RadixSelect.Root value={value} onValueChange={onChange} name={name}>
    <label className={clsx("mb-1", "block", "text-sm", "font-medium")}>
      {label}
    </label>
    <RadixSelect.Trigger
      className={clsx(
        "inline-flex items-center justify-between",
        "w-full",
        "bg-gray-100",
        "outline-none",
        "border",
        "py-2.5",
        "rounded-md",
        "px-2",
        "placeholder-gray-600",
        "placeholder-opacity-50",
        "placeholder:transition-all",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:placeholder-opacity-0"
      )}
      aria-label="Select"
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon>
        <IconChevronDown height={18} width={18} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal className="z-[9999999999]">
      <RadixSelect.Content
        className="overflow-hidden  bg-gray-50 rounded-md shadow-md w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] my-1"
        position="popper"
      >
        <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
          <IconChevronUp />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
          <IconChevronDown />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);

const SelectItem = forwardRef<any, any>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={clsx(
          "leading-none rounded-smPlus flex items-center p-2.5 pl-[30px]  hover:bg-gray-300 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-black my-2.5",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <IconCheck width={16} height={16} />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default Select;
