import {translate} from "../l10n/translate";
import {errorTranslations} from "./translations";

export const translateErrors = (errorJson) => {
    const output = {}
    for (const [key, value] of Object.entries(errorJson)) {
        output[key] = translate(value, errorTranslations);
    }
    return output;
}