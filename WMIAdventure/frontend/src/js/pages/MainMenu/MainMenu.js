import React from 'react';
import './MainMenu.scss';

import NavBar from '../../components/containers/NavBar';
import NotificationButton from '../../components/elements/NotificationButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';
import ProfileButton from '../../components/elements/ProfileButton';
import Logo from '../../components/elements/Logo';
import MainMenuModule from '../../components/elements/MainMenuModule';
import MainMenuContainer from '../../components/containers/MainMenuContainer';
import MainMenuSmallerModule from '../../components/elements/MainMenuSmallerModule/MainMenuSmallerModule';

import adventureImg from '../../../assets/images/adventure-image.png';
import battleImg from '../../../assets/images/battle-image.png';
import rankingImg from '../../../assets/images/ranking-image.png';
import local from '../../../assets/icons/local.svg';
import FlexCenterContainer from '../../components/containers/FlexCenterContainer';


function MainMenu() {
    return (
        <div className="MainMenu">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <MainMenuContainer>
                <MainMenuModule img={adventureImg} alt={'Zdjęcie wejścia do wydziału WMI.'} header={'ADVENTURE'} describe={'Przeżyj wydziałową historię w postaci Visual Novel.'}/>
                <MainMenuModule img={battleImg} alt={'Orkowie.'} header={'BATTLE'} describe={'Walcz z innymi graczami.'}/>
                <MainMenuModule img={rankingImg} alt={'Magowie.'} header={'RANKINGI'} describe={'Sprawdź jakim prosem jesteś.'}/>
            </MainMenuContainer>
            <FlexCenterContainer>
                <MainMenuSmallerModule label={'EVENT'} describe={'ZEPSUTY AUTOMAT'} time={'Pozostało: 2d 15h'} decorate={local}/>
                <MainMenuSmallerModule label={'QUIZ'} describe={'ROZWIĄŻ QUIZ'} time={false} decorate={false}/>
            </FlexCenterContainer>
        </div>
    );
}

export default MainMenu;