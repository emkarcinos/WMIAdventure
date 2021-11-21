import CardsAPIGateway from "../../api/gateways/CardsAPIGateway";
import {get, getWithSetCallback, set} from "../cache/cache";
import {effectKeys} from "../localStorageKeys";

/**
 * Returns list of all effects.
 * @returns {Promise<[]>}
 */
export const getAllEffects = async () => {
    let allEffects = [];
    let effectsIds = get(effectKeys.effectsIds);

    async function retrieveEffectsFromAPIAndSaveToStorage() {
        allEffects = await CardsAPIGateway.getAllEffects();

        // We save array of effects ids in storage. Later we can iterate over this array and retrieve individual effects.
        effectsIds = allEffects.map((effect) => effect.id);
        set(effectKeys.effectsIds, effectsIds);

        for (const effect of allEffects) {
            set(effectKeys.effectKey(effect.id), effect);
        }
    }

    /**
     * Iterates over all effects ids retrieved from storage and retrieves all individual effects.
     */
    function retrieveEffectsFromStorage() {
        for (const effectId of effectsIds) {
            const effect = get(effectKeys.effectKey(effectId));
            allEffects.push(effect);
        }
    }

    if (effectsIds) {
        retrieveEffectsFromStorage();
    }
    else {
        await retrieveEffectsFromAPIAndSaveToStorage();
    }

    return allEffects;
}

/**
 * Returns effect data.
 * @param id Id of effect that you want to get.
 * @returns {Promise<*>}
 */
export const getEffectById = async (id) => {
    const callback = async () => {
        const response = await CardsAPIGateway.getEffectById(id);
        return await response.json();
    }

    const effectData = await getWithSetCallback(effectKeys.effectKey(id), callback);
    return effectData;
}