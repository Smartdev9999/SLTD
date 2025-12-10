const LIBRETRANSLATE_API = 'https://libretranslate.com/translate';
const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

const LANGUAGE_CODES: Record<string, string> = {
  en: 'en',      // English
  la: 'lo',      // Lao
  th: 'th',      // Thai
  zh: 'zh',      // Chinese
};

const MYMEMORY_LANG_CODES: Record<string, string> = {
  en: 'en',
  la: 'lo',
  th: 'th',
  zh: 'zh-CN',
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

// LibreTranslate - better quality for Southeast Asian languages
async function translateWithLibre(
  text: string, 
  sourceLang: string, 
  targetLang: string
): Promise<string> {
  const response = await fetch(LIBRETRANSLATE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: LANGUAGE_CODES[sourceLang],
      target: LANGUAGE_CODES[targetLang],
      format: 'text',
    }),
  });

  if (!response.ok) {
    throw new Error(`LibreTranslate failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.translatedText;
}

// MyMemory fallback
async function translateWithMyMemory(
  text: string, 
  sourceLang: string, 
  targetLang: string
): Promise<string> {
  const sourceLangCode = MYMEMORY_LANG_CODES[sourceLang];
  const targetLangCode = MYMEMORY_LANG_CODES[targetLang];
  const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${sourceLangCode}|${targetLangCode}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`MyMemory failed: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'MyMemory translation failed');
  }

  return data.responseData.translatedText;
}

// Try LibreTranslate first, fallback to MyMemory
async function translateText(
  text: string, 
  sourceLang: string, 
  targetLang: string
): Promise<string> {
  if (!text.trim()) return '';

  try {
    return await translateWithLibre(text, sourceLang, targetLang);
  } catch {
    // Fallback to MyMemory
    return await translateWithMyMemory(text, sourceLang, targetLang);
  }
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
  
  await Promise.all(
    targetLanguages.map(async (targetLang) => {
      try {
        translations[targetLang] = await translateText(sourceText, sourceLang, targetLang);
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
