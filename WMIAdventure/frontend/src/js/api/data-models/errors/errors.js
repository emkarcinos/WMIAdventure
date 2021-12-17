import {translate} from "../l10n/translate";
import {errorTranslations} from "./translations";

export const translateErrors = (errorJson) => {
    const output = {}
    for (const [key, value] of Object.entries(errorJson)) {
        const errors = []
        for (const errorMsg of value)
            errors.push(translate(errorMsg, errorTranslations));
        output[key] = errors;
    }
    return output;
}