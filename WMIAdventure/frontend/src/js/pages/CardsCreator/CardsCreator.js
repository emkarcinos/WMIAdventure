import React from 'react';
import NavBar from '../../components/entertainment/organisms/NavBar';
import CreateCard from '../../components/creative/organisms/CreateCard';
import StyledWrapper from './StyledWrapper';

function CardsCreator() {
    return (
        <StyledWrapper>
            <NavBar />
            <CreateCard />
        </StyledWrapper>
    );
}

export default CardsCreator;
