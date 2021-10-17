/**
 * Creates form data with card image which can be sent to the server.
 * @param cardImage Card's image that you want to send.
 * @param cardName This data is required even if you only want to send image.
 * @param cardSubject This data is required even if you only want to send image.
 * @param cardTooltip This data is required even if you only want to send image.
 * @returns {FormData}
 */
const createFormDataToSendCardImage = (cardImage, cardName, cardSubject, cardTooltip) => {
    const formData = new FormData();

    formData.append('image', cardImage, cardImage.name);
    // Required data that has to be sent even if we only want to send image.
    formData.append('name', cardName);
    formData.append('subject', cardSubject);
    formData.append('tooltip', cardTooltip);

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
 * @param cardName
 * @param cardSubject
 * @param cardTooltip
 * @param effectsToSend
 * @param comment
 * @param levelCostValues
 * @returns {{headers: {"Content-type": string, Accept: string}, body: string}}
 */
const prepareRequestData = (cardName, cardSubject, cardTooltip, effectsToSend, comment, levelCostValues) => {
    const levelsToSend = prepareLevelsToSend(effectsToSend, levelCostValues);

    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };

    const body = JSON.stringify({
        name: cardName,
        subject: cardSubject,
        image: null,
        tooltip: cardTooltip,
        levels: levelsToSend,
        comment: comment
    });

    return {headers: headers, body: body};
}

export default {createFormDataToSendCardImage, prepareRequestData};