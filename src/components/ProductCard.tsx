import React from "react";
import { Product } from "../types";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (id: number) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isSelected,
  isDisabled,
  onToggle,
}) => {
  const handleClick = () => {
    if (!isDisabled || isSelected) onToggle(product.id);
  };

  return (
    <div
      className={[
        styles.card,
        isSelected ? styles.selected : "",
        isDisabled && !isSelected ? styles.disabled : "",
      ].join(" ")}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={isDisabled && !isSelected}
      tabIndex={isDisabled && !isSelected ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {isSelected && (
        <span className={styles.checkmark} aria-hidden="true">
          ✓
        </span>
      )}
      <p className={styles.name}>{product.name}</p>
      <p className={styles.category}>{product.category}</p>
      <p className={styles.price}>{product.price}</p>
    </div>
  );
};
