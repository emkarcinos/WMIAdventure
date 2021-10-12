import React from 'react';
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import FlexStyle from './styled-components/FlexStyle';
import FlexWrapWrap from './styled-components/FlexWrapWrap';
import NavHeader from '../global/molecules/NavHeader';
import TitleSection from './atoms/TitleSection';
import CardsImage from './atoms/CardsImage/CardsImage';
import CreatorOption from './atoms/CreatorOption';
import {desktop, mobile} from '../../../utils/globals';
import Media from 'react-media';

class CardsCreatorStart extends React.Component {
    render() {

        return (
            <>
                <Media query={mobile}>
                    <Wrapper>
                        <NavHeader backLink={'/'} label='Kreator Kart'/>
                        <Main>
                            <TitleSection />
                            <CardsImage />
                            <CreatorOption text='Nowa Karta' link='/cards-creator-create'/>
                            <CreatorOption text='Edycja Karty' link='/cards-creator-edit'/>
                        </Main>
                    </Wrapper>
                </Media>

                <Media query={desktop}>
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
                </Media>
            </>
        );
    }
}

export default CardsCreatorStart;