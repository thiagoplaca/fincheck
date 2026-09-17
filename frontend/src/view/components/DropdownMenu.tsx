import { DropdownMenu as RxdDropdownMenu } from "radix-ui";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RxdDropdownMenu.Root>{children}</RxdDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RxdDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RxdDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}
function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RxdDropdownMenu.Portal>
      <RxdDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-99",
          "data-[side=bottom]:animate-slideUpAndFade",
          "data-[side=top]:animate-slideDownAndFade",
          className,
        )}
      >
        {children}
      </RxdDropdownMenu.Content>
    </RxdDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RxdDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-6 outline-none flex items-center px-4 py-2 text-gray-800 text-sm rounded-2xl transition-colors cursor-pointer data-highlighted:bg-gray-50",
        className,
      )}
    >
      {children}
    </RxdDropdownMenu.Item>
  );
}
export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
