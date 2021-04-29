import React from 'react';
import './MainMenu.scss';

import NavBar from '../../components/organisms/NavBar';
import NotificationButton from '../../components/atoms/NotificationButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import Logo from '../../components/atoms/Logo';
import MainMenuModule from '../../components/atoms/MainMenuModule';
import MainMenuContainer from '../../components/organisms/MainMenuContainer';
import MainMenuSmallerModule from '../../components/atoms/MainMenuSmallerModule/MainMenuSmallerModule';
import FlexCenterContainer from '../../components/molecules/FlexCenterContainer';

import adventureImg from '../../../assets/images/adventure-image.png';
import battleImg from '../../../assets/images/battle-image.png';
import rankingImg from '../../../assets/images/ranking-image.png';
import local from '../../../assets/icons/local.svg';


function MainMenu() {
    return (
        <div className="MainMenu">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <MainMenuContainer>
                <MainMenuModule img={adventureImg} alt={'Zdjęcie wejścia do wydziału WMI.'} link={'/adventure'} header={'ADVENTURE'} describe={'Przeżyj wydziałową historię w postaci Visual Novel.'}/>
                <MainMenuModule img={battleImg} alt={'Orkowie.'} header={'BATTLE'} link={'/battle'} describe={'Walcz z innymi graczami.'}/>
                <MainMenuModule img={rankingImg} alt={'Magowie.'} header={'RANKINGI'} link={'/ranking'} describe={'Sprawdź jakim prosem jesteś.'}/>
            </MainMenuContainer>
            <FlexCenterContainer>
                <MainMenuSmallerModule link={'/event'} label={'EVENT'} describe={'ZEPSUTY AUTOMAT'} alt={'Ikonka lokalizacji.'} time={'Pozostało: 2d 15h'} decorate={local}/>
                <MainMenuSmallerModule link={'/quiz'} label={'QUIZ'} describe={'ROZWIĄŻ QUIZ'} time={false} decorate={false}/>
            </FlexCenterContainer>
        </div>
    );
}

export default MainMenu;