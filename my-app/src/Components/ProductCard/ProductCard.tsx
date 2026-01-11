// src/components/ProductCard.tsx
import { useContext } from "react";
import { Product } from "../../Interfaces/model";
import { useI18n } from "../../Context/LanguageContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

      const { translate } = useI18n();
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      
      {/* Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-contain mb-4"
      />

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
        {product.title}
      </h3>

      {/* Price */}
      <p className="text-lg font-bold text-blue-600 mb-4">
        ${product.price}
      </p>

      {/* Buy button */}
      <button
        className="mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {translate("BUY_NOW")}
      </button>
    </div>
  );
}
