const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

const LANGUAGE_CODES: Record<string, string> = {
  en: 'en',      // English
  la: 'lo',      // Lao
  th: 'th',      // Thai
  zh: 'zh-CN',   // Chinese Simplified
};

export type LanguageKey = 'en' | 'la' | 'th' | 'zh';

export interface TranslationResult {
  success: boolean;
  translations: {
    en: string;
    la: string;
    th: string;
    zh: string;
  };
  errors?: string[];
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text.trim()) return '';
  
  const langCode = LANGUAGE_CODES[targetLang] || targetLang;
  const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Translation failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'Translation failed');
  }
  
  return data.responseData.translatedText;
}

export async function translateFromEnglish(englishText: string): Promise<TranslationResult> {
  return translateToOtherLanguages(englishText, 'en');
}

export async function translateToOtherLanguages(
  sourceText: string, 
  sourceLang: LanguageKey
): Promise<TranslationResult> {
  const errors: string[] = [];
  const translations: Record<LanguageKey, string> = { en: '', la: '', th: '', zh: '' };
  
  // Keep source language text as-is
  translations[sourceLang] = sourceText;
  
  // Get all other languages to translate to
  const targetLanguages = (['en', 'la', 'th', 'zh'] as const).filter(lang => lang !== sourceLang);
  
  const sourceLangCode = LANGUAGE_CODES[sourceLang];
  
  await Promise.all(
    targetLanguages.map(async (targetLang) => {
      try {
        const targetLangCode = LANGUAGE_CODES[targetLang];
        const url = `${MYMEMORY_API}?q=${encodeURIComponent(sourceText)}&langpair=${sourceLangCode}|${targetLangCode}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Translation failed: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.responseStatus !== 200) {
          throw new Error(data.responseDetails || 'Translation failed');
        }
        
        translations[targetLang] = data.responseData.translatedText;
      } catch (error) {
        errors.push(`${targetLang}: ${error instanceof Error ? error.message : 'Failed'}`);
        translations[targetLang] = '';
      }
    })
  );
  
  return {
    success: errors.length === 0,
    translations,
    errors: errors.length > 0 ? errors : undefined,
  };
}

export function detectChangedLanguage(
  original: Record<LanguageKey, string>,
  current: Record<LanguageKey, string>
): LanguageKey | null {
  const changedLangs: LanguageKey[] = [];
  
  (['en', 'la', 'th', 'zh'] as const).forEach(lang => {
    if (original[lang] !== current[lang]) {
      changedLangs.push(lang);
    }
  });
  
  // Only return source if exactly one language changed
  if (changedLangs.length === 1) {
    return changedLangs[0];
  }
  
  return null;
}
