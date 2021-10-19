import RequestSender from "../../RequestSender";
import cards_utils from "./cards_utils";
import CardsEndpoints from "../../endpoints/CardsEndpoints";

/**
 * This function makes PUT request to send image of newly created proposed card.
 * @param serverResponse Server response after we created proposed card. Card's id will be retrieved from it and used to send PUT request.
 * @param basicCardData {BasicCardData}
 * @param successHandler Function that will be called if request was successful.
 * @param failureHandler Function that will be called if request was a failure.
 */
const sendCardImage = (serverResponse, basicCardData,
                       successHandler, failureHandler) => {
    serverResponse.json().then(jsonResponse => {
        const newProposedCardId = jsonResponse['id'];
        const formData = cards_utils.createFormDataToSendCardImage(basicCardData);
        const url = CardsEndpoints.proposed_cards + `${newProposedCardId}/`;

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
 * @param wholeCardData {WholeCardData}
 * @param comment {string}
 * @param successHandler Function that will be called if request was successful.
 * @param failureHandler Function that will be called if request was a failure.
 */
const sendProposedCard = (wholeCardData, comment, successHandler, failureHandler) => {
    const requestData =
        cards_utils.prepareRequestData(wholeCardData, comment);

    return RequestSender.post(CardsEndpoints.proposed_cards, requestData.body, requestData.headers)
        .then(response => {
            if(response.ok) {
                // Card's data was sent successfully and there is card image.
                if(wholeCardData.basicCardData.image){
                    sendCardImage(response, wholeCardData.basicCardData, successHandler, failureHandler);
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