import Card from "../../../card-editor/atoms/Card";

class UserCard extends Card {
    callChosenCardHandler(event) {
        this.props.chosenCardHandler(
            event,
            this.props.id,
            this.props.access
        )
    }
}

export default UserCard;