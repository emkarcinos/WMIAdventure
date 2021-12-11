const createFormDataToSendAvatarImage = (basicUserData) => {
    const formData = new FormData();

    // If we didn't change the image it will not be an object.
    if (typeof (basicUserData.image) === 'object')
        formData.append('image', basicUserData.image, basicUserData.image.name);

    // Required data that has to be sent even if we only want to send image.
    formData.append('user', basicUserData.userId);
    formData.append('displayedUsername', basicUserData.username);
    formData.append('semester', basicUserData.semester);

    return formData;
}


const prepareBasicUserDataToSend = (basicUserData) => {
    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };

    const body = JSON.stringify({
        user: basicUserData.userId,
        displayedUsername: basicUserData.username,
        semester: basicUserData.semester,
    });

    return {headers: headers, body: body};
}

export default {createFormDataToSendAvatarImage, prepareBasicUserDataToSend};