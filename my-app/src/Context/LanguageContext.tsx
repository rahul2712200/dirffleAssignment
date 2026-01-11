import { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../Constant/Constant";
import { Option } from "../Interfaces/model";
type Translations = Record<string, string>;

const LanguageContext = createContext<any>(null);

type Language = "en" | "es";


async function loadLanguage(lang: Language) {
  switch (lang) {
    case "es":
      return import("./../assets/es.json");
    default:
      return import("./../assets/en.json");
  }
}


export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {

    const [translations, setTranslations] = useState<Translations>({});
    const languageOptions: Option[] = [
        { key: "en", value: "English" },
        { key: "es", value: "Español" },
    ];

    
  

    const validLanguages = languageOptions.map(opt => opt.key) as Language[];

    const lang = localStorage.getItem(LOCAL_STORAGE_KEY.LANG) as string;
    let defaultlang: Language = 'en';
    
    if (lang && validLanguages.includes(lang as Language)) {
      defaultlang = lang as Language;
    }
    
    const [language, setLanguage] = useState<Language>(defaultlang);

  useEffect(()=> {
    const lang = localStorage.getItem(LOCAL_STORAGE_KEY.LANG) as string
    if (lang && validLanguages.includes(lang as Language)) {
        setLanguage(language);
      }
    else {
        setLanguage("en");
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY.LANG, language);
    loadLanguage(language).then((module) => {
        setTranslations(module.default);
        console.log(module);
    });
  }, [language]);

  const translate = (key: string) => translations[key] || key;


  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => useContext(LanguageContext);
