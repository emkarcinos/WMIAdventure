import React from 'react';

import NavBar from './organisms/NavBar';
import MainMenuModule from './atoms/MainMenuModule';
import GridOneColumn from '../global/molecules/GridOneColumn';
import MainMenuSmallerModule from './atoms/MainMenuSmallerModule/MainMenuSmallerModule';
import FlexCenterContainer from './molecules/FlexCenterContainer';

import adventureImg from '../../../../assets/images/adventure-image.png';
import battleImg from '../../../../assets/images/battle-image.png';
import rankingImg from '../../../../assets/images/ranking-image.png';
import local from '../../../../assets/icons/local.svg';
import StyledWrapper from './StyledWrapper';


function MainMenu() {
    return (
        <StyledWrapper className="MainMenu">
            <NavBar />
            <GridOneColumn rowGaps='16px' margin='80px 0 16px 0'>
                <MainMenuModule img={adventureImg} alt={'Zdjęcie wejścia do wydziału WMI.'} link={'/adventure'} header={'ADVENTURE'} describe={'Przeżyj wydziałową historię w postaci Visual Novel.'}/>
                <MainMenuModule img={battleImg} alt={'Orkowie.'} header={'BATTLE'} link={'/battle'} describe={'Walcz z innymi graczami.'}/>
                <MainMenuModule img={rankingImg} alt={'Magowie.'} header={'RANKINGI'} link={'/ranking'} describe={'Sprawdź jakim prosem jesteś.'}/>
            </GridOneColumn>
            <FlexCenterContainer>
                <MainMenuSmallerModule link={'/event'}
                                       label={'EVENT'}
                                       describe={'ZEPSUTY AUTOMAT'}
                                       alt={'Ikonka lokalizacji.'}
                                       time={'Pozostało: 2d 15h'}
                                       decorate={local}/>
                <MainMenuSmallerModule link={'/quiz'}
                                       label={'QUIZ'}
                                       describe={'ROZWIĄŻ QUIZ'}
                                       time={false} decorate={false}/>
            </FlexCenterContainer>
        </StyledWrapper>
    );
}

export default MainMenu;