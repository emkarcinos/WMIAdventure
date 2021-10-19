import React from 'react';
import NavBar from '../MainMenu/organisms/NavBar';
import Main from './styled-components/Main';
import H2 from './styled-components/H2';
import Ul from './styled-components/Ul';
import UserListItem from './atoms/UserListItem';
import Pager from './atoms/Pager';
import MyProfileMobile from './molecules/MyProfileMobile';
import Search from '../../creative/CardsCreator/atoms/Search';

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],
        mainVisible: true,
        searchInput: '',
        defenderDecks: [],
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    render() {
        return (
            <>
                <NavBar />
                <Main>
                    <H2>
                        Wybierz przeciwnika
                    </H2>
                    <Ul>
                        <Search searchInput={this.state.searchInput}
                                handleSearch={this.handleSearch} />

                        <UserListItem access login={'emkarcinos'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={4} level={12} />

                        <UserListItem access login={'wirus006'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={1} level={2} />

                        <UserListItem access login={'sweet michael'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={2} level={10} />

                        <UserListItem access login={'sweet michael'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={2} level={10} />

                        <UserListItem access login={'sweet michael'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={2} level={10} />

                        <UserListItem access={false} login={'dawidos kaktus'}
                                      searchInput={this.state.searchInput}
                                      avatar={null} term={3} level={20} />
                    </Ul>
                    <Pager />
                    <MyProfileMobile />
                </Main>
            </>

        );
    }
}

export default BattleMode;