import { CATEGORIES, PRIORITIES } from "./categories";

export function CategoryBadge({ category }) {
  const meta = CATEGORIES[category] ?? CATEGORIES.water;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      <span className={meta.text}>{meta.label}</span>
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const meta = PRIORITIES[priority] ?? PRIORITIES.medium;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.bg} ${meta.text}`}>
      {meta.label}
    </span>
  );
}