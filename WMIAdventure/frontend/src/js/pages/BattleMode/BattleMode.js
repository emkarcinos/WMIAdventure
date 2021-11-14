import React from 'react';
import {Helmet} from 'react-helmet';

import NavBar from '../../components/prototype/organisms/NavBar';
import H2 from './styled-components/H2';
import Main from './styled-components/Main';
import Ul from './styled-components/Ul';
import UserProfilesAPIGateway from '../../api/gateways/UserProfilesAPIGateway';
import Search from '../../components/global/atoms/Search';
import SwipeProfile from '../../components/battle/organisms/SwipeProfile';
import SearchContainer from './styled-components/SearchContainer';
import OpponentSelected from '../../components/battle/organisms/OpponentSelected';
import UserListItem from '../../components/battle/molecules/UserListItem';
import Media from 'react-media';
import {desktop, mobile} from '../../utils/globals';
import DesktopLeft from './styled-components/DesktopLeft';
import DesktopRight from './styled-components/DesktopRight';
import kuceBattle from '../../../assets/images/kuceBattle.png';
import KuceBattleImage from './styled-components/KuceBattleImage';
import Title from './styled-components/Title';
import TinyProfileDesktop from '../../components/battle/organisms/TinyProfileDesktop';
import {getCurrentUserId, getCurrentUsername} from "../../storage/user/userData";
import LoadingPopUp from "../../components/global/atoms/LoadingPopUp";

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],

        mainVisible: true,
        searchInput: '',
        defenderDecks: [],

        userPreviewRun: false,
        loggedInUserId: 0,
        loggedInUsername: ' ',
        userPreviewPos: '-100vh',
        userPreviewOpacity: '0',
        scrollVisible: true,
        fightLoading: false,
        selectedUser: {}
    }

    componentDidMount() {
        UserProfilesAPIGateway.getAllBasicUsersInfo()
            .then(data => this.setState({users: data}))
            .catch(error => console.log(error));
        getCurrentUserId()
            .then(id => id ? this.setState({loggedInUserId: id}) : null);
        getCurrentUsername()
            .then(name => name ? this.setState({loggedInUsername: name}) : null);
    }


    runUserPreviewHandler = (username, userId) => {
        this.setState({
            userPreviewRun: true,
            selectedUser: {
                username: username,
                id: userId
            }
        });

        this.hideScroll();

        setTimeout(() => {
            this.setState({
                userPreviewPos: '0',
                userPreviewOpacity: '1'
            });
        }, 5);
    }

    closeUserPreviewHandler = () => {
        this.setState({
            userPreviewPos: '-100vh',
            userPreviewOpacity: '0',
            scrollVisible: true,
        });

        this.showScroll();

        setTimeout(() => {
            this.setState({
                userPreviewRun: false,
            });
        }, 550);
    }

    hideScroll = () => {
        this.setState({
            scrollVisible: false
        });
    }

    showScroll = () => {
        this.setState({
            scrollVisible: true
        });
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    kuceStartFight = () => {
        this.setState({
            fightLoading: true,
        });
    }

    kuceStopFight = () => {
        this.setState({
            fightLoading: false,
        });
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Tryb Battle</title>
                </Helmet>
                <NavBar/>
                <Main>
                    <Media query={mobile}>
                        <>
                            <H2>
                                Wybierz przeciwnika
                            </H2>
                            <SearchContainer>
                                <Search searchInput={this.state.searchInput}
                                        handleSearch={this.handleSearch}/>
                            </SearchContainer>
                            <Ul scrollVisible={this.state.scrollVisible}>
                                {this.state.users.results ? this.state.users.results.map((elem) => {
                                    return (
                                        <UserListItem key={elem.user}
                                                      access={!(elem.user === this.state.loggedInUserId)}
                                                      displayedUsername={elem.displayedUsername}
                                                      searchInput={this.state.searchInput}
                                                      term={elem.semester} level={elem.user * 4}
                                                      runUserPreviewHandler={() => this.runUserPreviewHandler(
                                                          elem.displayedUsername,
                                                          elem.user)}/>
                                    );
                                }) : ''}
                            </Ul>
                            <SwipeProfile userId={this.state.loggedInUserId} username={this.state.loggedInUsername}
                                          hideScroll={this.hideScroll} showScroll={this.showScroll}/>
                        </>
                    </Media>

                    <Media query={desktop}>
                        <>
                            <DesktopRight>
                                <H2>
                                    Wybierz przeciwnika
                                </H2>
                                <KuceBattleImage src={kuceBattle} alt=""/>
                                <Title>
                                    Battle
                                </Title>
                            </DesktopRight>
                            <DesktopLeft>
                                <SearchContainer>
                                    <Search searchInput={this.state.searchInput}
                                            handleSearch={this.handleSearch}/>
                                </SearchContainer>
                                <Ul scrollVisible={this.state.scrollVisible}>
                                    {this.state.users.results ? this.state.users.results.map((elem) => {
                                        return (
                                            <UserListItem key={elem.user}
                                                          access={!(elem.user === this.state.loggedInUserId)}
                                                          displayedUsername={elem.displayedUsername}
                                                          searchInput={this.state.searchInput}
                                                          term={elem.semester} level={elem.user * 4}
                                                          runUserPreviewHandler={() => this.runUserPreviewHandler(
                                                              elem.displayedUsername,
                                                              elem.user)}/>
                                        );
                                    }) : ''}
                                </Ul>
                            </DesktopLeft>
                        </>
                    </Media>
                </Main>
                <TinyProfileDesktop userId={this.state.loggedInUserId} username={this.state.loggedInUsername}/>
                <OpponentSelected visible={this.state.userPreviewRun}
                                  opponent={this.state.selectedUser}
                                  setTranslateY={this.state.userPreviewPos}
                                  setOpacity={this.state.userPreviewOpacity}
                                  runUserPreviewHandler={this.runUserPreviewHandler}
                                  closeUserPreviewHandler={this.closeUserPreviewHandler}
                                  kuceStartFight={this.kuceStartFight} kuceStopFight={this.kuceStopFight}/>
                <LoadingPopUp visible={this.state.fightLoading} view={'Szybka walka'}/>
            </>
        );
    }
}

export default BattleMode;