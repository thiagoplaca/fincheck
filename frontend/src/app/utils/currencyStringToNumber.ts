export function currencyStringToNumber(value: string | number) {
  //const removeDots = value.replaceAll(/\./g, "").replace(",", ".");

  if (typeof value === "number") {
    return value;
  }
  return Number(value);
}
