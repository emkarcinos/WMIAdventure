import React from 'react';
import NavBar from '../../components/entertainment/organisms/NavBar';
import CardForm from '../../components/creative/organisms/CardFormRaw';
import CardFormDesign from '../../components/creative/organisms/CardFormDesign';
import StyledWrapper from './StyledWrapper';

function CardsCreator() {
    return (
        <StyledWrapper>
            <NavBar />
            <CardFormDesign />
        </StyledWrapper>
    );
}

export default CardsCreator;
