import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { clsx } from "clsx";
import React, { forwardRef } from "react";

interface DataProps {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder: string;
  data: DataProps[];
}

export const CustomSelect = ({ placeholder, data }: SelectProps) => (
  <Select.Root>
    <Select.Trigger
      className={clsx(
        "inline-flex items-center justify-between leading-none h-[35px] text-violet11 data-[placeholder]:text-gray-500 outline-none w-full",
        "gap-2",
        "py-1.5",
        "px-2",
        "bg-gray-100",
        "rounded-md",
        "text-sm",
        "font-sans",
        "focus:outline focus:outline-gray-200 focus:outline-offset-0"
      )}
    >
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="h-5 w-5 text-violet-900">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        className="overflow-hidden bg-gray-50 rounded-md shadow-md mt-1 w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]"
        position="popper"
      >
        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-violet-900 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-1">
          <Select.Group>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-violet-900 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = forwardRef<any, any>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "text-sm leading-none rounded-smPlus flex items-center p-2 pl-[30px]  hover:bg-gray-100 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-black",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon width={16} height={16} />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
