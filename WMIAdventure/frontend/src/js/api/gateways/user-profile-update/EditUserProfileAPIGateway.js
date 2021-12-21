import UserUtils from "./UserUtils";
import UserProfilesEndpoints from "../../endpoints/UserProfilesEndpoints";
import RequestSender from "../../RequestSender";

const sendUserNewAvatar = (serverResponse, basicUserData,
                           successHandler, failureHandler) => {
    serverResponse.json().then(() => {
        const formData = UserUtils.createFormDataToSendAvatarImage(basicUserData);
        const url = UserProfilesEndpoints.userById(basicUserData.userId);

        RequestSender.put(url, formData).then(
            response => {
                if (response.ok)
                    successHandler();
                else
                    failureHandler(serverResponse);
            }
        );
    })
}

const sendUserNewData = (basicUserData, successHandler, failureHandler) => {
    const requestData = UserUtils.prepareBasicUserDataToSend(basicUserData);

    return RequestSender.patch(UserProfilesEndpoints.userById(basicUserData.userId), requestData.body, requestData.headers)
        .then(response => {
            if (response.ok) {
                if (basicUserData.image)
                    sendUserNewAvatar(response, basicUserData, successHandler, failureHandler);
                else
                    successHandler();
            } else
                failureHandler(response.json());
        })
}

export default {sendUserNewData, sendUserNewAvatar};