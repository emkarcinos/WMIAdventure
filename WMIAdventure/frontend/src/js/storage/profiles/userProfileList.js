import {getWithSetCallback} from "../cache/cache";
import {profileKey, userProfileKeys} from "../localStorageKeys";
import UserProfilesAPIGateway from "../../api/gateways/UserProfilesAPIGateway";

export const getAllUserProfiles = async () => {
    const callback = async () => {
        try {
            const response = await UserProfilesAPIGateway.getAllBasicUsersInfo();
            return await response;
        } catch (errors) {
            console.log(errors);
            return null
        }
    }

    return await getWithSetCallback(userProfileKeys.profileList, callback);
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
    return await getWithSetCallback(profileKey(id), callback)
}