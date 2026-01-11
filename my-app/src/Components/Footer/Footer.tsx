// src/Components/Footer.tsx
import { useI18n } from "../../Context/LanguageContext";
export default function Footer() {
  const { translate } = useI18n();

  return (
    <footer className="bg-gray-900 text-white w-full px-4 py-4 fixed bottom-0 ">
      <div className="max-w-7xl mx-auto flex justify-between">
        
        {/* Brand / Logo */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-blue-500">ShopEasy</h1>
          <p className="text-gray-400 text-sm">
            {translate("FOOTER_DESC")}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold">{translate("FOOTER_NAV") || "Navigation"}</h2>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            {translate("HOME")}
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            {translate("PRODUCTS")}
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold">{translate("FOOTER_CONTACT")}</h2>
          <p className="text-gray-400 text-sm">123 Main Street, City</p>
          <p className="text-gray-400 text-sm">Email: support@shopeasy.com</p>
          <p className="text-gray-400 text-sm">Phone: +1 234 567 890</p>
        </div>

      </div>
    </footer>
  );
}
