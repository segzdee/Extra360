import { LanguageCode } from './languageConfig';

class TranslationService {
  private currentLanguage: LanguageCode = LanguageCode.ENGLISH;
  private translations: Record<LanguageCode, Record<string, string>> = {
    [LanguageCode.ENGLISH]: {
      welcome: 'Welcome to ExtraStaff360',
      dashboard: 'Dashboard',
      shifts: 'Shifts',
      earnings: 'Earnings',
      profile: 'Profile'
    },
    [LanguageCode.SPANISH]: {
      welcome: 'Bienvenido a ExtraStaff360',
      dashboard: 'Panel',
      shifts: 'Turnos',
      earnings: 'Ganancias',
      profile: 'Perfil'
    },
    [LanguageCode.ARABIC]: {
      welcome: 'مرحبًا بك في ExtraStaff360',
      dashboard: 'لوحة المعلومات',
      shifts: 'النوبات',
      earnings: 'الأرباح',
      profile: 'الملف الشخصي'
    },
    [LanguageCode.FRENCH]: {
      welcome: 'Bienvenue sur ExtraStaff360',
      dashboard: 'Tableau de bord',
      shifts: 'Quarts',
      earnings: 'Revenus',
      profile: 'Profil'
    }
  };

  // Get current language
  getCurrentLanguage(): LanguageCode {
    return this.currentLanguage;
  }

  // Set language
  setLanguage(language: LanguageCode): void {
    this.currentLanguage = language;
    // Update document direction
    document.documentElement.dir = 
      language === LanguageCode.ARABIC ? 'rtl' : 'ltr';
    
    // Update language attribute
    document.documentElement.lang = language;

    // Trigger language change event
    window.dispatchEvent(new Event('languageChanged'));
  }

  // Translate a key
  translate(key: string, language?: LanguageCode): string {
    const lang = language || this.currentLanguage;
    return this.translations[lang][key] || key;
  }

  // Interpolate translations
  interpolate(key: string, params: Record<string, string>, language?: LanguageCode): string {
    let translation = this.translate(key, language);
    
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });

    return translation;
  }
}

export default new TranslationService();
