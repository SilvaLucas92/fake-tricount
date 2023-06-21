import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const TooltipComponent = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: any;
}) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            className=" text-white select-none rounded-md bg-black p-2 text-sm"
          >
            {label}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
