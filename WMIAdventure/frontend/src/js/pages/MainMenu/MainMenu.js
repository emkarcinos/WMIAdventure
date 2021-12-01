import React from 'react';
import {Helmet} from 'react-helmet';
import GridOneColumn from '../../components/prototype/molecules/GridOneColumn';
import MainMenuModule from '../../components/prototype/atoms/MainMenuModule';
import adventureImg from '../../../assets/images/adventure-image.png';
import battleImg from '../../../assets/images/battle-image.png';
import rankingImg from '../../../assets/images/ranking-image.png';
import StyledWrapper from './StyledWrapper';
import Navbar from "../../components/global/atoms/Navbar";


function MainMenu() {
    return (
        <>
            <Helmet>
                <title>Strona główna WMI Adventure</title>
            </Helmet>
            <StyledWrapper className="MainMenu">
                <Navbar/>
                <GridOneColumn rowGaps='16px' margin='80px 0 16px 0'>
                    <MainMenuModule img={adventureImg} alt={'Zdjęcie wejścia do wydziału WMI.'} link={'/adventure'}
                                    header={'ADVENTURE'}
                                    describe={'Przeżyj wydziałową historię w postaci Visual Novel.'}/>
                    <MainMenuModule img={battleImg} alt={'Orkowie.'} header={'BATTLE'} link={'/battle'}
                                    describe={'Walcz z innymi graczami.'}/>
                    <MainMenuModule img={rankingImg} alt={'Magowie.'} header={'RANKINGI'} link={'/ranking'}
                                    describe={'Sprawdź jakim prosem jesteś.'}/>
                </GridOneColumn>
            </StyledWrapper>
        </>
    );
}

export default MainMenu;