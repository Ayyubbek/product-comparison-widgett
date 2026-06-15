import React from "react";
import { Product } from "../types";
import { COMPARISON_ROWS } from "../data/products";
import styles from "./ComparisonTable.module.css";

interface Props {
  products: Product[];
  onRemove: (id: number) => void;
}

export const ComparisonTable: React.FC<Props> = ({ products, onRemove }) => {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Select products above to compare them</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.labelCol}>Feature</th>
            {products.map((p) => (
              <th key={p.id} className={styles.productCol}>
                <div className={styles.productHeader}>
                  <div>
                    <p className={styles.productName}>{p.name}</p>
                    <p className={styles.productCategory}>{p.category}</p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(p.id)}
                    aria-label={`Remove ${p.name} from comparison`}
                  >
                    ✕
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => {
            const values = products.map((p) => p[row.key]);
            const differs =
              products.length > 1 && new Set(values).size > 1;

            return (
              <tr
                key={row.key}
                className={differs ? styles.diffRow : undefined}
              >
                <td className={styles.labelCell}>
                  {differs && (
                    <span className={styles.diffBadge} aria-label="values differ">
                      ●
                    </span>
                  )}
                  {row.label}
                </td>
                {values.map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={styles.legend}>
        <span className={styles.legendDot} aria-hidden="true">●</span>
        Highlighted rows have different values
      </p>
    </div>
  );
};
