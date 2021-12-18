/**
 * Helper function that translates a key using a translation dict
 * @param value key for translation
 * @param translations - dict of key:value pairs with translations
 * @return string
 */
export const translate = (value, translations) => {
    const translation = translations[value]
    if (!translation) {
        // Idempotency - don't fail when no translation is found
        return value;
    }

    return translation;
}