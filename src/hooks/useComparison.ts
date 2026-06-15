import { useState, useEffect } from "react";

const STORAGE_KEY = "comparison_selected_ids";
const MAX_COMPARE = 3;

function loadFromStorage(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable
  }
}

export function useComparison() {
  const [selectedIds, setSelectedIds] = useState<number[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(selectedIds);
  }, [selectedIds]);

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const remove = (id: number) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const isSelected = (id: number) => selectedIds.includes(id);
  const isFull = selectedIds.length >= MAX_COMPARE;

  return { selectedIds, toggle, remove, isSelected, isFull };
}
