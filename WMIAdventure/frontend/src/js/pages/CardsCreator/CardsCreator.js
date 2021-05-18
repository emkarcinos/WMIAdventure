import React from 'react';
import NavBar from '../../components/entertainment/organisms/NavBar';
import CardForm from '../../components/creative/organisms/CardForm';
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
