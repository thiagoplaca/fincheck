import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/FormatDate";
import { Popover } from "./PopoverRoot";
import { DatePicker } from "../components/DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({
  error,
  className,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "w-full bg-white rounded-lg border h-12 px-3 text-gray-700 outline-none text-left relative border-gray-500 focus:border-gray-800 transition-all pt-5",
              error && "border-red-900!",
              className,
            )}
          >
            <span className="absolute text-gray-700 text-xs top-2 left-3 pointer-events-none">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
