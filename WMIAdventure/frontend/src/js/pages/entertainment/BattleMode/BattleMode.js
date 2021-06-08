import React from 'react';
import NavBar from '../MainMenu/organisms/NavBar';
import Wrapper from './styled-components/Wrapper';
import GridOneColumn from '../global/molecules/GridOneColumn';

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
                <GridOneColumn rowGaps='32px' margin='0'>
                    {this.state.users.map((user) => {
                        return (
                          <p key={user.user}>
                              {user.displayedUsername}
                          </p>
                        );
                    })}
                </GridOneColumn>
            </Wrapper>
        );
    }
}

export default BattleMode;