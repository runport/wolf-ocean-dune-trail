const SWATCH: Record<string, string> = {
  سرمه‌ای: "#1e3a5f",
  مشکی: "#1a1a1a",
  بژ: "#cbb79a",
  کرم: "#e6d5b8",
  "آبی تیره": "#234e70",
  "آبی راه‌راه": "#3d6b8a",
  خردلی: "#b08a3c",
  سفید: "#f4f1ea",
  برنز: "#8a6a45",
  طبیعی: "#c4b49a",
};

export function colorSwatch(name: string): string {
  if (SWATCH[name]) return SWATCH[name];
  for (const [key, value] of Object.entries(SWATCH)) {
    if (name.includes(key)) return value;
  }
  return "#8a8173";
}
