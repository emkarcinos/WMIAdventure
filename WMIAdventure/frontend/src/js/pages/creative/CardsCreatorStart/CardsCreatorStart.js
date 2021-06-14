import React from 'react';
import isMobile from "react-device-detect";
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import FlexStyle from './styled-components/FlexStyle';
import FlexWrapWrap from './styled-components/FlexWrapWrap';
import NavHeader from '../global/molecules/NavHeader';
import TitleSection from './atoms/TitleSection';
import CardsImage from './atoms/CardsImage/CardsImage';
import CreatorOption from './atoms/CreatorOption';

class CardsCreatorStart extends React.Component {
    render() {
        if (isMobile) {
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
        } else {
            return(
                <Wrapper>
                    <NavHeader backLink={'/'} label='Kreator Kart'/>
                    <Main>
                        <CardsImage />
                        <FlexStyle>
                            <div>
                                <TitleSection />
                            </div>
                            <FlexWrapWrap>
                                <CreatorOption text='Nowa Karta' link='/cards-creator-create'/>
                                <CreatorOption text='Edycja Karty' link='/cards-creator-edit'/>
                            </FlexWrapWrap>
                        </FlexStyle>
                        <CardsImage />
                    </Main>
                </Wrapper>
            );
        }
        

    }
}

export default CardsCreatorStart;