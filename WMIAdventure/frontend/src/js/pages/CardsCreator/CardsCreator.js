import React from 'react';
import './CardsCreator.scss';

import NavBar from '../../components/organisms/NavBar';
import CardForm from '../../components/organisms/CardForm';

function CardsCreator() {
    return (
        <div className='CardsCreator'>
            <NavBar />
            <CardForm />
        </div>
    );
}

export default CardsCreator;
