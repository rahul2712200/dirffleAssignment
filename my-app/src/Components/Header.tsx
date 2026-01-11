import { useI18n } from "../Context/LanguageContext";
import Dropdown from "./Dropdown/Dropdown";
import { Option } from "../Interfaces/model";
import { useState } from "react";

export default function Header() {
  const { language, setLanguage, translate, languageOptions } = useI18n();

  // Initialize selected language dynamically
  const initialLang = languageOptions.find((item: Option)=> item.key == language);
  const [selectedLang, setSelectedLang] = useState<Option>(initialLang);

  const changeLanguage = (newLang: Option) => {
    setSelectedLang(newLang); // update dropdown UI
    setLanguage(newLang.key.toLowerCase() as "en" | "es"); // update context
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            🛒 ShopEasy
          </div>

          {/* Language dropdown */}
          <Dropdown
            options={languageOptions}
            defaultValue={selectedLang}
            onChange={changeLanguage}
          />

        </div>
      </div>
    </header>
  );
}
