// Translation service with LibreTranslate (primary) and MyMemory (fallback)
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

// Translate FROM English to other languages only (English is master language)
export async function translateFromEnglish(englishText: string): Promise<TranslationResult> {
  const errors: string[] = [];
  const translations: Record<LanguageKey, string> = { en: englishText, la: '', th: '', zh: '' };
  
  // Only translate to non-English languages
  const targetLanguages: LanguageKey[] = ['la', 'th', 'zh'];
  
  await Promise.all(
    targetLanguages.map(async (targetLang) => {
      try {
        translations[targetLang] = await translateText(englishText, 'en', targetLang);
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

