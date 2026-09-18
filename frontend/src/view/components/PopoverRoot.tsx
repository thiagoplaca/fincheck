import { Popover as RxdPopover } from "radix-ui";
import { cn } from "../../app/utils/cn";

function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RxdPopover.Root>{children}</RxdPopover.Root>;
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RxdPopover.Trigger asChild>{children}</RxdPopover.Trigger>;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RxdPopover.Portal>
      <RxdPopover.Content
        className={cn(
          "rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-99 p-4",
          "data-[side=bottom]:animate-slideUpAndFade",
          "data-[side=top]:animate-slideDownAndFade",
          className,
        )}
      >
        {children}
      </RxdPopover.Content>
    </RxdPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
