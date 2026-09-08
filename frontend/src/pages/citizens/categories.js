// Category + priority metadata shared by every citizen-facing page.
// Swap this for an API-driven lookup later; the shape stays the same.

export const CATEGORIES = {
  water: { label: "Water", dot: "bg-sky-500", text: "text-sky-600", chipActive: "bg-sky-500 text-white" },
  agriculture: { label: "Agriculture", dot: "bg-emerald-500", text: "text-emerald-600", chipActive: "bg-emerald-500 text-white" },
  healthcare: { label: "Healthcare", dot: "bg-rose-500", text: "text-rose-600", chipActive: "bg-rose-500 text-white" },
  infrastructure: { label: "Infrastructure", dot: "bg-amber-500", text: "text-amber-600", chipActive: "bg-amber-500 text-white" },
  education: { label: "Education", dot: "bg-violet-500", text: "text-violet-600", chipActive: "bg-violet-500 text-white" },
  environment: { label: "Environment", dot: "bg-teal-500", text: "text-teal-600", chipActive: "bg-teal-500 text-white" },
};

export const PRIORITIES = {
  critical: { label: "Critical", bg: "bg-red-50", text: "text-red-600" },
  high: { label: "High", bg: "bg-orange-50", text: "text-orange-600" },
  medium: { label: "Medium", bg: "bg-amber-50", text: "text-amber-600" },
};

export const STAGES = ["Reported", "Validated", "University Working", "Prototype", "Pilot", "Deployed"];