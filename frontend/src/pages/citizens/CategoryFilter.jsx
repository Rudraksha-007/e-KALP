import { CATEGORIES } from "./categories";

export default function CategoryFilterBar({ active, onChange }) {
  const chips = [{ key: "all", label: "All" }, ...Object.entries(CATEGORIES).map(([key, meta]) => ({ key, label: meta.label }))];

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = active === chip.key;
        const meta = CATEGORIES[chip.key];
        return (
          <button
            key={chip.key}
            onClick={() => onChange(chip.key)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? chip.key === "all"
                  ? "border-orange-500 bg-orange-500 text-white"
                  : `border-transparent ${meta.chipActive}`
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
            }`}
          >
            {chip.key !== "all" && <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : meta.dot}`} />}
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}