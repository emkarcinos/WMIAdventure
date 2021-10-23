import React from 'react';
import {Helmet} from 'react-helmet';
import Wrapper from './styled-components/Wrapper';
import Main from './styled-components/Main';
import FlexStyle from './styled-components/FlexStyle';
import FlexWrapWrap from './styled-components/FlexWrapWrap';
import Media from 'react-media';
import NavHeader from '../../components/prototype/molecules/NavHeader';
import TitleSection from '../../components/card-editor/atoms/TitleSection';
import CardsImage from '../../components/card-editor/atoms/CardsImage/CardsImage';
import CreatorOption from '../../components/card-editor/atoms/CreatorOption';
import {desktop, mobile} from '../../utils/globals';

class CardsCreatorStart extends React.Component {
    render() {

        return (
            <>
                <Helmet>
                    <title> Narzędzie kreatora kart WMI Adventure </title>
                </Helmet>
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