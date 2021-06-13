import React from 'react';
import styled from 'styled-components';
import isMobile from "react-device-detect";
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import NavHeader from '../global/molecules/NavHeader';
import TitleSection from './atoms/TitleSection';
import CardsImage from './atoms/CardsImage/CardsImage';
import CreatorOption from './atoms/CreatorOption';

class CardsCreatorStart extends React.Component {
    render() {
        const FlexStyle = styled.div`
            display: flex; 
            flex-direction: row;
        `;

        const FlexWrapWrap = styled.div`
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            margin-left: 100px;
        `
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