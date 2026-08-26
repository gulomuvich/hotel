export type Currency = "USD" | "UZS" | "EUR";

export function formatMoney(usd: number, currency: Currency): string {
  if (currency === "UZS") {
    return Math.round(usd * 12850).toLocaleString("uz-UZ") + " so'm";
  }
  if (currency === "EUR") return "€" + Math.round(usd * 0.92).toLocaleString();
  return "$" + usd.toLocaleString();
}
