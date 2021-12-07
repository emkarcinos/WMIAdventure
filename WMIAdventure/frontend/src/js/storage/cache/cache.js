/**
 * Get an item under a key. If such item does not exist, create a new one from data returned by callback.
 * @param {string} key
 * @param {function(*=): *} setCallback
 * @param ttl Time for a key to live in seconds
 */
export const getWithSetCallback = async (key, setCallback, ttl = 120) => {
    const cachedItem = get(key);
    if (cachedItem)
        return cachedItem

    const data = await setCallback();
    if (data === null || data === undefined) return data;
    return set(key, data, ttl);
}

/**
 * Return a value of an item. If no value is present in cache null is returned
 * @param {string} key
 */
export const get = (key) => {
    const cachedItem = sessionStorage.getItem(key);
    if (!cachedItem)
        return null;

    const parsedItem = JSON.parse(cachedItem);
    const now = new Date();

    if (now.getTime() > parsedItem.expiry) {
        sessionStorage.removeItem(key);
        return null;
    }
    return parsedItem.value;

}

/**
 * Sets a value under a given key and return it.
 * @param key
 * @param obj
 * @param ttl - time in seconds for a key to live. 2 minutes by default.
 */
export const set = (key, obj, ttl = 120) => {
    if (obj) {
        const now = new Date();

        const ttlInSeconds = ttl * 1000
        const item = {
            value: obj,
            expiry: now.getTime() + ttlInSeconds
        }

        const val = JSON.stringify(item)
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