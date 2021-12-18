import {translate} from "../translate";

test('Should translate when key is found', () => {
    const beforeTranslation = 'asdf';
    const translated = '123123123123';
    const mockTranslation = {
        [beforeTranslation]: translated
    }

    const afterTranslation = translate(beforeTranslation, mockTranslation);
    expect(afterTranslation).toBe(translated);
});

test('Should not fail if no translation is found', () => {
    const beforeTranslation = 'asdf';
    const mockTranslation = {}

    const afterTranslation = translate(beforeTranslation, mockTranslation);
    expect(afterTranslation).toBe(beforeTranslation);
});