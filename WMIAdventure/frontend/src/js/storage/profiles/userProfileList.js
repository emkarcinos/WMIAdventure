import {getWithSetCallback} from "../cache/cache";
import {profileKey, userProfileKeys} from "../localStorageKeys";
import UserProfilesAPIGateway from "../../api/gateways/UserProfilesAPIGateway";

const cacheUsersForSeconds = 300 // 5 minutes;

export const getAllUserProfiles = async (flatten = true) => {
    const callback = async () => {
        try {
            const response = await UserProfilesAPIGateway.getAllBasicUsersInfo();
            return await response;
        } catch (errors) {
            console.log(errors);
            return null
        }
    }

    const cachePages = await getWithSetCallback(userProfileKeys.profileList, callback, cacheUsersForSeconds);
    return flatten ? cachePages.flatMap(item => item.results) : cachePages;
}

export const getUserListPage = async (pageNumber) => {
    const allProfiles = await getAllUserProfiles(false);
    return allProfiles.filter(page => page.page === pageNumber)[0];
}

export const getUserById = async (id) => {
    const callback = async () => {
        try {
            const response = await UserProfilesAPIGateway.getUserById(id);
            return await response.json();
        } catch (errors) {
            console.log(errors);
            return null
        }
    }
    return await getWithSetCallback(profileKey(id), callback, cacheUsersForSeconds);
}