import { useEffect, useState, useCallback } from "react";
import throttle from "lodash/throttle";
import { Product } from "../Interfaces/model";
import { fetchProducts } from "../Services/ProductService";
import ProductCard from "../Components/ProductCard/ProductCard";
import { useI18n } from "../Context/LanguageContext";
import { useDebounce } from "../Hooks/useDebounce";

export default function ProductListing() {
  const { language, translate } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 16;

  const debouncedSearch = useDebounce(search, 300);

  // Load products from API
  const loadProducts = async (pageNum: number, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(pageNum, limit, debouncedSearch); // ✅ pass search
      setProducts(prev => (append ? [...prev, ...data.products] : data.products));
      setHasMore(pageNum * limit < data.total);
    } catch (err) {
      console.error(err);
      setError(language === "es" ? "Error al cargar productos" : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
    loadProducts(1, false);
  }, [debouncedSearch]);

  // Infinite scroll handler (throttled)
  const handleScroll = useCallback(
    throttle(() => {
      if (!hasMore || loading) return;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setPage(prev => prev + 1);
      }
    }, 500),
    [hasMore, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return; // already loaded
    loadProducts(page, true); // append new products
  }, [page]);

  return (
    <div className="w-full max-w-7xl">
      {/* Search input */}
      <input
        type="text"
        placeholder={translate("SEARCH")}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Loading / Error */}
      <div className="w-full  py-4">
  {/* Products grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>

  {/* Loading / Error */}
  {loading && (
    <div className="flex justify-center"><img src="https://media.docquity.com/doc-web-app/assets/images/loader-small.svg"/></div>
  )}
  {page == 1 && error && (
    <p className="text-center mt-4 text-red-500">{translate("ERROR_TEXT")}</p>
  )}

  {/* No more products */}
  {!hasMore && (
    <p className="text-center mt-4">{translate("NO_MORE_PRODUCT")}</p>
  )}
</div>

    </div>
  );
}
