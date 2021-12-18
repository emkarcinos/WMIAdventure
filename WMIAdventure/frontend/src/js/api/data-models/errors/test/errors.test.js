import {translateErrors} from "../errors";
import {errorTranslations} from "../translations";

test('Should translate errors array correctly', () => {
    const [translationKey, translationValue] = Object.entries(errorTranslations)[0];
    const translations = {
        [translationKey]: translationValue
    }
    const jsonError = {
        'key': [translationKey, 'c']
    }

    const afterTranslation = translateErrors(jsonError, translations);

    expect(afterTranslation.key[0]).toBe(translationValue);
    expect(afterTranslation.key[1]).toBe(jsonError.key[1]);
})