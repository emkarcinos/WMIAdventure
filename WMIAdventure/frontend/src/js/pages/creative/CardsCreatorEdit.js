import React from 'react';
import CardsCreator from './CardsCreator';
import CardChoose from './CardsCreator/molecules/CardChoose';

class CardsCreatorEdit extends React.Component {
    state = {
        cardName: '',
        cardSubject: '',
        cardTooltip: '',
        levelCostValues: [],
        effectsFromApi: [],
        effectsToSend: [[], [], []],

        cardsFromAPI: [],
        showCardChoose: true,
    }

    componentDidMount() {
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/cards/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({cardsFromAPI: data}))
            .catch(error => console.log(error));
    }

    hideCardChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showCardChoose: false});
    }

    render() {
        return (
            <>
                <CardChoose showCardChoose={this.state.showCardChoose}
                            hideCardChooseHandler={this.hideCardChooseHandler}
                            cardsFromAPI={this.state.cardsFromAPI} />
                <CardsCreator creatorType='Edycja karty'/>
            </>
        );
    }
}

export default CardsCreatorEdit;