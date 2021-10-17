import RequestSender from "../../RequestSender";
import ProposedContentEndpoints from "../../endpoints/ProposedContentEndpoints";
import cards_utils from "./cards_utils";

/**
 * This function makes PUT request to send image of newly created proposed card.
 * @param serverResponse Server response after we created proposed card. Card's id will be retrieved from it and used to send PUT request.
 * @param cardImage Card's image that you want to send.
 * @param cardName This data is required even if you only want to send image.
 * @param cardSubject This data is required even if you only want to send image.
 * @param cardTooltip This data is required even if you only want to send image.
 * @param successHandler Function that will be called if request was successful.
 * @param failureHandler Function that will be called if request was a failure.
 */
const sendCardImage = (serverResponse, cardImage, cardName, cardSubject, cardTooltip,
                       successHandler, failureHandler) => {
    serverResponse.json().then(jsonResponse => {
        const newProposedCardId = jsonResponse['id'];
        const formData = cards_utils.createFormDataToSendCardImage(cardImage, cardName, cardSubject, cardTooltip);
        const url = ProposedContentEndpoints.cards + `${newProposedCardId}/`;

        RequestSender.put(url, formData).then (
            response => {
                if(response.ok) {
                    successHandler();
                } else {
                    failureHandler(response.json());
                }
            }
        );
    })
}

/**
 * Sends proposed card to API.
 * @param cardName
 * @param cardSubject
 * @param image
 * @param cardTooltip
 * @param effectsToSend
 * @param comment
 * @param levelCostValues
 * @param successHandler Function that will be called if request was successful.
 * @param failureHandler Function that will be called if request was a failure.
 */
const sendProposedCard = (cardName, cardSubject, image, cardTooltip, effectsToSend, comment, levelCostValues,
                          successHandler, failureHandler) => {
    const requestData =
        cards_utils.prepareRequestData(cardName, cardSubject, cardTooltip, effectsToSend, comment, levelCostValues);

    return RequestSender.post(ProposedContentEndpoints.cards, requestData.body, requestData.headers)
        .then(response => {
            if(response.ok) {
                // Card's data was sent successfully and there is card image.
                if(image){
                    sendCardImage(response, image, cardName, cardSubject, cardTooltip,
                        successHandler, failureHandler);
                }
                // Card's data was sent successfully and there is no card image.
                else{
                    successHandler();
                }
            } else {
                failureHandler(response.json());
            }
        }
    );
}


export default {sendProposedCard}