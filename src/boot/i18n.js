import { boot } from "quasar/wrappers";
import { createI18n } from 'vue-i18n'
import messages from "src/i18n";
import { DEFAULT_LANG } from "configs/language";
// i18nInstance
const i18nInstance = createI18n({
  fallbackLocale: DEFAULT_LANG,
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LANG,
  messages,
});

export default boot( async ({ app }) => {
  app.use(i18nInstance);
  app.i18n = i18nInstance
});

export const i18n = i18nInstance.global;

