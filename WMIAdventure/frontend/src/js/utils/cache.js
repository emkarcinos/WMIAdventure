/**
 * Get an item under a key. If such item does not exist, create a new one from data returned by callback.
 * @param {string} key
 * @param {function(*=): *} setCallback
 */
export const getWithSetCallback = async (key, setCallback) => {
    const cachedItem = get(key);
    if(cachedItem)
        return cachedItem

    const data = await setCallback();
    return set(key, data);
}

/**
 * Return a value of an item. If no value is present in cache null is returned
 * @param {string} key
 */
export const get = (key) => {
    const cachedItem = sessionStorage.getItem(key);
    if(cachedItem)
        return JSON.parse(cachedItem)
    return null
}

/**
 * Sets a value under a given key and return it.
 * @param key
 * @param obj
 */
export const set = (key, obj) => {
    if(obj){
        const val = JSON.stringify(obj)
        sessionStorage.setItem(key, val);
        return obj;
    }
    return null
}

/**
 * Remove an item from cache by key.
 * @param {string} key
 */
export const invalidateItem = (key) => {
    sessionStorage.removeItem(key)
}

export const purge = () => {
    sessionStorage.clear();
}

export default {getWithSetCallback, invalidateItem, get, set, purge};