import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// نصوص اللغات الأربع الأساسية
const translations = {
  en: {
    welcome: "My Habits",
    addHabit: "Add new habit...",
    stats: "Statistics",
  },
  ar: {
    welcome: "عاداتي",
    addHabit: "أضف عادة جديدة...",
    stats: "الإحصائيات",
  },
  fr: {
    welcome: "Mes Habitudes",
    addHabit: "Ajouter une nouvelle habitude...",
    stats: "Statistiques",
  },
  es: {
    welcome: "Mis Hábitos",
    addHabit: "Agregar nuevo hábito...",
    stats: "Estadísticas",
  },
};

const i18n = new I18n(translations);

// تحديد لغة الجهاز أو الاعتماد على الإنجليزية كافتراضي
i18n.locale = getLocales()[0]?.languageCode ?? "en";
i18n.enableFallback = true;

export default i18n;
