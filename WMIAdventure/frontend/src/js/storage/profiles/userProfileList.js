import {get, getWithSetCallback, set} from "../cache/cache";
import {profileKey, userProfileKeys} from "../localStorageKeys";
import UserProfilesAPIGateway from "../../api/gateways/UserProfilesAPIGateway";

const cacheUsersForSeconds = 300 // 5 minutes;

export const getAllUserProfiles = async (flatten = true) => {
    let pageNumber = 1;
    let page = await getUserListPage(pageNumber);
    const results = [page];
    while (page.hasNext) {
        pageNumber++;
        page = await getUserListPage(pageNumber)
        results.push(page);
    }
    return flatten ? results.flatMap(item => item.results) : results;
}

export const getUserListPage = async (pageNumber) => {
    const callback = async () => {
        try {
            return await UserProfilesAPIGateway.getBasicUserInfoPage(pageNumber);
        } catch (errors) {
            console.log(errors);
            return null;
        }
    }
    const allUsersPaginatedCache = await get(userProfileKeys.profileList);
    const allUsersPaginated = allUsersPaginatedCache ? allUsersPaginatedCache : [];
    const pageFromCache = allUsersPaginated ? allUsersPaginated.filter(page => page.page === pageNumber)[0] : null;
    if (pageFromCache)
        return pageFromCache;

    const pageFromBackend = await callback();
    if (!pageFromBackend)
        return null;
    allUsersPaginated.push(pageFromBackend);
    await set(userProfileKeys.profileList, allUsersPaginated, cacheUsersForSeconds);
    return pageFromBackend;

}

export const getUserById = async (id, forceUpdate = true) => {
    const callback = async () => {
        try {
            const response = await UserProfilesAPIGateway.getUserById(id);
            return await response.json();
        } catch (errors) {
            console.log(errors);
            return null
        }
    }
    if (forceUpdate)
        await set(profileKey(id), callback, cacheUsersForSeconds);
    return await getWithSetCallback(profileKey(id), callback, cacheUsersForSeconds);
}