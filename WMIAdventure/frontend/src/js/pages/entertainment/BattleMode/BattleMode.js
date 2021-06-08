import React from 'react';
import NavBar from '../MainMenu/organisms/NavBar';
import Wrapper from './styled-components/Wrapper';
import H2 from './styled-components/H2';
import Main from './styled-components/Main';
import Ul from './styled-components/Ul';
import UserToFight from './molecules/UserToFight';

class BattleMode extends React.Component {

    state = {
        users: [],
    }

    componentDidMount() {
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/igusers/basic/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({users: data}))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Wrapper>
                <NavBar />
                <Main>
                    <H2>
                        Wybierz gracza, którego chcesz wyzwać na pojedynek
                    </H2>
                    <Ul>
                        {this.state.users.map((user) => {
                            return (
                                    <UserToFight key={`user-${user.user}`}>
                                        {user.displayedUsername}
                                    </UserToFight>
                            );
                        })}
                    </Ul>

                </Main>
            </Wrapper>
        );
    }
}

export default BattleMode;