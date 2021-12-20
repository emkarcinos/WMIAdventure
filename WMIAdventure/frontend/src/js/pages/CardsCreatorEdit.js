import React from 'react';
import {Helmet} from 'react-helmet';
import CardsCreator from '../components/card-editor/organisms/CardsCreator';

class CardsCreatorEdit extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Edycja karty</title>
                </Helmet>
                <CardsCreator creatorType='edit'/>
            </>
        );
    }
}

export default CardsCreatorEdit;