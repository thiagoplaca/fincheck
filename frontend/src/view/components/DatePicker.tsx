import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface DatePickerProps {
  value: Date;
  onChange(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      mode="single"
      selected={value}
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        weekday: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        day_button:
          "hover:text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full",
        today: "bg-gray-50 font-bold text-white rounded-full",
        selected: "!bg-teal-900 text-white font-medium rounded-full",
      }}
      formatters={{
        formatCaption: (date) =>
          capitalizeFirstLetter(format(date, "MMMM yyyy")),
      }}
    />
  );
}
