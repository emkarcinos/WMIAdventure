import React from 'react';
import NavBar from '../../components/organisms/NavBar';
import CardForm from '../../components/organisms/CardForm';
import StyledWrapper from './StyledWrapper';

function CardsCreator() {
    return (
        <StyledWrapper>
            <NavBar />
            <CardForm />
        </StyledWrapper>
    );
}

export default CardsCreator;
