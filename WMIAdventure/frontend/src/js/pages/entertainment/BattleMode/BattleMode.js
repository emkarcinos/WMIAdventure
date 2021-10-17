import React from 'react';
import NavBar from '../MainMenu/organisms/NavBar';
import Wrapper from './styled-components/Wrapper';
import H2 from './styled-components/H2';
import Main from './styled-components/Main';
// import Ul from './styled-components/Ul';
// import UserToFight from './molecules/UserToFight';
import BattleResult from './molecules/BattleResult';
import UserListItem from './atoms/UserListItem';

class BattleMode extends React.Component {

    state = {
        users: [],
        currentUserDecks: [],
        mainVisible: true,

        defenderDecks: [],
    }

    componentDidMount() {
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/igusers/basic/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({users: data}))
            .catch(error => console.log(error));


        setTimeout(() => {
            let loggedUserId;

            for(let i = 0; i < this.state.users.length; i++) {
                if(this.state.users[i].displayedUsername === 'PumPkin') {
                    loggedUserId = this.state.users[i].user;
                }
            }

            console.log(loggedUserId);

            fetch(`http://${API}/api/igusers/${loggedUserId}/decks/`)
                .then(response => {
                    return response.json();
                })
                .then(data => this.setState({currentUserDecks: data}))
                .catch(error => console.log(error));
        }, 2000);
    }

    battleResultHandler = (event, id) => {
        event.preventDefault();
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/igusers/${id}/decks/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({defenderDecks: data}))
            .catch(error => console.log(error));

        this.setState({resultId: id});
        this.setState({mainVisible: false});
    }

    render() {
        return (
            <Wrapper>
                <NavBar />
                <Main visible={this.state.mainVisible}>
                    <H2>
                        Wybierz gracza, którego chcesz wyzwać na pojedynek
                    </H2>
                    {/*<Ul>*/}
                    {/*    {this.state.users.map((user) => {*/}
                    {/*        return (*/}
                    {/*                <UserToFight key={`user-${user.user}`}*/}
                    {/*                             userId={user.user}*/}
                    {/*                             battleResultHandler={this.battleResultHandler}>*/}
                    {/*                    {user.displayedUsername}*/}
                    {/*                </UserToFight>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</Ul>*/}
                    <UserListItem access login={'dawidos kaktus'} avatar={null} term={1} level={2} />
                    <UserListItem access login={'sweet michael'} avatar={null} term={2} level={10} />
                    <UserListItem access={false} login={'emkarcinos'} avatar={null} term={3} level={20} />
                </Main>
                {
                    this.state && this.state.resultId &&
                    <BattleResult opponentId={this.state.resultId}
                                  defenderDecks={this.state.defenderDecks}
                                  currentUserDecks={this.state.currentUserDecks}/>
                }
            </Wrapper>
        );
    }
}

export default BattleMode;