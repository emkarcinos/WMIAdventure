import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import NavHeader from '../global/molecules/NavHeader';
import TitleSection from './atoms/TitleSection';
import CardsImage from './atoms/CardsImage/CardsImage';
import CreatorOption from './atoms/CreatorOption';

class CardsCreatorStart extends React.Component {
    render() {
        return (
            <Wrapper>
                <NavHeader backLink={'/'} label='Kreator Kart'/>
                <Main>
                    <TitleSection />
                    <CardsImage />
                    <CreatorOption text='Nowa Karta' link='/cards-creator-create'/>
                    <CreatorOption text='Edycja Karty' link='/cards-creator-edit'/>
                </Main>
            </Wrapper>
        );
    }
}

export default CardsCreatorStart;