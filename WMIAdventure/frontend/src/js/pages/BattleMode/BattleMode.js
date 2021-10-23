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
import MobilePopUp from '../../components/battle/organisms/MobilePopUp';
import OpponentSelected from '../../components/battle/organisms/OpponentSelected';
import UserListItem from '../../components/battle/molecules/UserListItem';

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],

        mainVisible: true,
        searchInput: '',
        defenderDecks: [],

        userPreviewRun: false,
        userPreviewPos: '-100vh',
        scrollVisible: true,
    }

    componentDidMount() {
        UserProfilesAPIGateway.getAllBasicUsersInfo()
            .then(data => this.setState({users: data}))
            .catch(error => console.log(error));
    }


    runUserPreviewHandler = () => {
        this.setState({
            userPreviewRun: true,
        });

        this.hideScroll();

        setTimeout(() => {
            this.setState({
                userPreviewPos: '0',
            });
        }, 5);
    }

    closeUserPreviewHandler = () => {
        this.setState({
            userPreviewPos: '-100vh',
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

    render() {
        return (
            <>
                <Helmet>
                    <title>Tryb Battle</title>
                </Helmet>
                <NavBar />
                <Main>
                    <H2>
                        Wybierz przeciwnika
                    </H2>
                    <SearchContainer>
                        <Search searchInput={this.state.searchInput}
                                handleSearch={this.handleSearch} />
                    </SearchContainer>
                    <Ul scrollVisible={this.state.scrollVisible}>
                        {this.state.users.results ? this.state.users.results.map((elem) => {
                            return (
                                <UserListItem key={elem.user} access={elem.semester < 2}
                                              displayedUsername={elem.displayedUsername}
                                              searchInput={this.state.searchInput}
                                              term={elem.semester} level={elem.user * 4}
                                              runUserPreviewHandler={this.runUserPreviewHandler} />
                            );
                        }) : ''}
                    </Ul>
                    {/*<Pager next={this.state.users.next}*/}
                    {/*       previous={this.state.users.previous} />*/}
                    <SwipeProfile hideScroll={this.hideScroll} />
                </Main>

                <MobilePopUp visible={this.state.userPreviewRun}
                             setTranslateY={this.state.userPreviewPos}
                             closeHandler={this.closeUserPreviewHandler}>
                    <OpponentSelected closeUserPreviewHandler={this.closeUserPreviewHandler} />
                </MobilePopUp>
            </>
        );
    }
}

export default BattleMode;