const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

const LANGUAGE_CODES: Record<string, string> = {
  la: 'lo',      // Lao
  th: 'th',      // Thai
  zh: 'zh-CN',   // Chinese Simplified
};

export interface TranslationResult {
  success: boolean;
  translations: {
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
  const errors: string[] = [];
  const translations = { la: '', th: '', zh: '' };
  
  const languages = ['la', 'th', 'zh'] as const;
  
  await Promise.all(
    languages.map(async (lang) => {
      try {
        translations[lang] = await translateText(englishText, lang);
      } catch (error) {
        errors.push(`${lang}: ${error instanceof Error ? error.message : 'Failed'}`);
        translations[lang] = '';
      }
    })
  );
  
  return {
    success: errors.length === 0,
    translations,
    errors: errors.length > 0 ? errors : undefined,
  };
}
