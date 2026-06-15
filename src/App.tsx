import React from "react";
import { PRODUCTS } from "./data/products";
import { useComparison } from "./hooks/useComparison";
import { ProductCard } from "./components/ProductCard";
import { ComparisonTable } from "./components/ComparisonTable";

const App: React.FC = () => {
  const { selectedIds, toggle, remove, isSelected, isFull } = useComparison();

  const selectedProducts = selectedIds
    .map((id) => PRODUCTS.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
          Product Comparison
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280" }}>
          Select up to 3 products to compare side by side
          {selectedIds.length > 0 && (
            <span style={{ marginLeft: 8, background: "#eff6ff", color: "#1d4ed8", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              {selectedIds.length}/3 selected
            </span>
          )}
        </p>
      </header>

      <section aria-label="Product list">
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
          All products
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            gap: 10,
            marginBottom: "2rem",
          }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={isSelected(product.id)}
              isDisabled={isFull && !isSelected(product.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      </section>

      <section aria-label="Comparison table">
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
          Comparison
        </h2>
        <ComparisonTable products={selectedProducts} onRemove={remove} />
      </section>
    </div>
  );
};

export default App;
