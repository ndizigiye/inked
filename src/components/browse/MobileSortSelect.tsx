"use client";
import { useRouter } from "next/navigation";

interface Props {
  activeGenre: string;
  activeSort: string;
  sorts: { value: string; label: string }[];
}

export function MobileSortSelect({ activeGenre, activeSort, sorts }: Props) {
  const router = useRouter();
  return (
    <select
      className="bg-surface-container text-on-surface text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-outline-variant/20 mb-4"
      defaultValue={activeSort}
      onChange={(e) => router.push(`/browse?genre=${activeGenre}&sort=${e.target.value}`)}
    >
      {sorts.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
}
