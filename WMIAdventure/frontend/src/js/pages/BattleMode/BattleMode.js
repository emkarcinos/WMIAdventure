import React from 'react';
import {Helmet} from 'react-helmet';

import NavBar from '../../components/prototype/organisms/NavBar';
import H2 from './styled-components/H2';
import Main from './styled-components/Main';
import Ul from './styled-components/Ul';
import UserProfilesAPIGateway from '../../api/gateways/UserProfilesAPIGateway';
import Search from '../../components/global/atoms/Search';
import UserListItem from '../../components/battle/atoms/UserListItem';
import MyProfileMobile from '../../components/battle/molecules/MyProfileMobile';

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],
        mainVisible: true,
        searchInput: '',
        defenderDecks: [],
    }

    componentDidMount() {
        UserProfilesAPIGateway.getAllBasicUsersInfo()
            .then(data => this.setState({users: data}))
            .catch(error => console.log(error));
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
                    <Ul>
                        <Search searchInput={this.state.searchInput}
                                handleSearch={this.handleSearch} />
                        {this.state.users.results ? this.state.users.results.map((elem) => {
                            return (
                                <UserListItem key={elem.user} access={elem.semester < 2}
                                              login={elem.displayedUsername}
                                              searchInput={this.state.searchInput}
                                              term={elem.semester}
                                              level={Math.floor(Math.random() * 30 + 1)} />
                            );
                        }) : ''}
                    </Ul>
                    {/*<Pager next={this.state.users.next}*/}
                    {/*       previous={this.state.users.previous} />*/}
                    <MyProfileMobile />
                </Main>
            </>
        );
    }
}

export default BattleMode;