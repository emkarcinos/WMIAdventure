import React from 'react';
import {Helmet} from 'react-helmet';
import H2 from './styled-components/H2';
import Main from './styled-components/Main';
import Ul from './styled-components/Ul';
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
import {getCurrentUserData} from "../../storage/user/userData";
import LoadingPopUp from "../../components/global/atoms/LoadingPopUp";
import {getAllUserProfiles, getUserListPage} from "../../storage/profiles/userProfileList";
import BasicUserData from "../../api/data-models/user/BasicUserData";
import {DetailedUserData, nullDetailedUserData} from "../../api/data-models/user/DetailedUserData";
import Pager from "../../components/battle/atoms/Pager";

class BattleMode extends React.Component {
    title = 'Tryb Battle';

    state = {
        users: [],
        currentUserDecks: [],

        mainVisible: true,
        searchInput: '',
        defenderDecks: [],

        userPreviewRun: false,
        loggedInUser: nullDetailedUserData(),
        userPreviewPos: '-100vh',
        userPreviewOpacity: '0',
        scrollVisible: true,
        fightLoading: false,
        fightLoadingText: '',
        selectedUser: null
    }

    populateCurrentUserData = async () => {
        const userData = await getCurrentUserData();
        if (!userData)
            return
        const user = new DetailedUserData(userData.user, userData.displayedUsername, userData.semester, userData.image, userData.level);
        await user.fetchNonVitalDataFromBackend();
        this.setState({loggedInUser: user});
    }

    async fetchAndFillProfiles(page = 1) {
        console.log('fetching')
        let data;
        if (page === 0)
            data = {
                page: 1,
                hasNext: false,
                hasPrev: false,
                results: await getAllUserProfiles(),
            }
        else
            data = await getUserListPage(page);
        if (!data)
            return;

        const users = [];
        for (const user of data.results)
            users.push(new BasicUserData(user.user, user.displayedUsername, user.semester, user.image, user.level))

        this.setState({
            users: {
                hasNext: data.hasNext,
                hasPrev: data.hasPrev,
                page: data.page,
                results: users,
            }
        });
    }

    componentDidMount() {
        this.fetchAndFillProfiles();
        this.populateCurrentUserData();
    }

    runUserPreviewHandler = (user) => {
        this.setState({
            userPreviewRun: true,
            selectedUser: user
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
                selectedUser: null,
            });
            this.forceUpdate();
        }, 300);
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
        if (keyValue.length > 0 && (this.state.users.hasNext || this.state.users.hasPrev))
            this.fetchAndFillProfiles(0)
        else if (keyValue.length === 0)
            this.fetchAndFillProfiles(1)
        this.setState({searchInput: keyValue});
    }

    kuceStartFight = (text) => {
        this.setState({
            fightLoading: true,
            fightLoadingText: text
        });
    }

    kuceStopFight = () => {
        this.setState({
            fightLoading: false,
        });
    }

    userListItemsRender = () => {
        return (
            <Ul scrollVisible={this.state.scrollVisible}>
                {this.state.users.results ? this.state.users.results.map((elem) => {
                    if (elem.userId === this.state.loggedInUser.userId)
                        return null;
                    return (
                        <UserListItem key={elem.userId}
                                      access={!(elem.userId === this.state.loggedInUser.userId)}
                                      user={elem}
                                      searchInput={this.state.searchInput}
                                      runUserPreviewHandler={() => this.runUserPreviewHandler(elem)}/>
                    );
                }) : ''}
            </Ul>
        );
    }

    renderOponentSelected() {
        return (
            <>
                <OpponentSelected visible={this.state.userPreviewRun}
                                  caller={this.state.loggedInUser}
                                  opponent={this.state.selectedUser}
                                  setTranslateY={this.state.userPreviewPos}
                                  setOpacity={this.state.userPreviewOpacity}
                                  runUserPreviewHandler={this.runUserPreviewHandler}
                                  closeUserPreviewHandler={this.closeUserPreviewHandler}
                                  kuceStartFight={this.kuceStartFight} kuceStopFight={this.kuceStopFight}/>
            </>
        )
    }

    nextUsersListPage = () => {
        if (!this.state.users.hasNext) return;
        this.fetchAndFillProfiles(this.state.users.page + 1)
    }

    prevUsersListPage = () => {
        if (!this.state.users.hasPrev) return;
        this.fetchAndFillProfiles(this.state.users.page - 1)
    }

    renderPaginator(isDesktop) {
        if (!this.state.users) return null;
        return (<Pager setMargin={isDesktop ? '16px 0 0 0' : null} page={this.state.users.page}
                       next={this.state.users.hasNext}
                       previous={this.state.users.hasPrev}
                       onNext={this.nextUsersListPage}
                       onPrevious={this.prevUsersListPage}
        />)
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
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
                            {this.userListItemsRender()}
                            {this.renderPaginator(false)}
                            <SwipeProfile user={this.state.loggedInUser}
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
                                {this.userListItemsRender()}
                                {this.renderPaginator(true)}
                            </DesktopLeft>
                        </>
                    </Media>
                </Main>
                <TinyProfileDesktop user={this.state.loggedInUser}/>
                {this.state.selectedUser ? this.renderOponentSelected() : null}
                <LoadingPopUp visible={this.state.fightLoading} view={this.state.fightLoadingText}/>
            </>
        );
    }
}

export default BattleMode;