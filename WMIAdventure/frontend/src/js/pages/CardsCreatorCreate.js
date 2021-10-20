import React from 'react';
import { Helmet } from 'react-helmet';
import CardsCreator from '../components/card-editor/organisms/CardsCreator';

class CardsCreatorCreate extends React.Component {
    render() {
        return (                
            <>
                <Helmet>
                    <title>Kreator kart WMI Adventure</title>
                </Helmet>
                <CardsCreator creatorType='create' />
            </>
        );
    }
}

export default CardsCreatorCreate;