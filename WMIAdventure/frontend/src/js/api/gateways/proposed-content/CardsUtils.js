/**
 * Creates form data with card image which can be sent to the server.
 * @param basicCardData {BasicCardData}
 * @returns {FormData}
 */
const createFormDataToSendCardImage = (basicCardData) => {
    const formData = new FormData();
    // If we didn't change the image it will not be an object.
    if (typeof (basicCardData.image) === 'object')
        formData.append('image', basicCardData.image, basicCardData.image.name);
    // Required data that has to be sent even if we only want to send image.
    formData.append('name', basicCardData.name);
    formData.append('subject', basicCardData.subject);
    formData.append('tooltip', basicCardData.tooltip);
    formData.append('comment', basicCardData.comment);

    return formData;
}

/**
 * Prepares cards levels data to send to API.
 * @param effectsToSend
 * @param levelCostValues
 * @returns {*[]} Array of prepared levels objects.
 */
const prepareLevelsToSend = (effectsToSend, levelCostValues) => {
    const levelsToSend = [];
    for (let i = 0; i < effectsToSend.length; i++) {
        if (effectsToSend[i].length !== 0) {
            levelsToSend.push(
                {
                    level: String(i + 1),
                    next_level_cost: levelCostValues[i],
                    effects: effectsToSend[i]
                }
            );
        }
    }
    return levelsToSend;
}

/**
 * Prepares data for request to send proposed card to API.
 * @param wholeCardData {WholeCardData}
 * @param comment
 * @returns {{headers: {"Content-type": string, Accept: string}, body: string}}
 */
const prepareRequestData = (wholeCardData, comment) => {
    const levelsToSend = prepareLevelsToSend(wholeCardData.effects, wholeCardData.levelCostValues);

    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };

    const body = JSON.stringify({
        name: wholeCardData.basicCardData.name,
        subject: wholeCardData.basicCardData.subject,
        image: null,
        tooltip: wholeCardData.basicCardData.tooltip,
        levels: levelsToSend,
        comment: comment
    });

    return {headers: headers, body: body};
}

export default {createFormDataToSendCardImage, prepareRequestData};