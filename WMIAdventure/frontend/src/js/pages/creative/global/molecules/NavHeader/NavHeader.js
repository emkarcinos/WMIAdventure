import React from 'react';
import Header from './styled-components/Header';
import Back from './styled-components/Back';
import Menu from './styled-components/Menu';
import {Link} from 'react-router-dom';
import NavMenu from '../../atoms/NavMenu';
import Span from './styled-components/Span';

class NavHeader extends React.Component {
    state = {
        showNav: false,
    }

    showNavHandler = (event) => {
        event.preventDefault();
        this.setState({showNav: true});
    }

    hideNavHandler = (event) => {
        event.preventDefault();
        this.setState({showNav: false});
    }

    render() {
        return (
            <Header>
                <Back as={Link} to={this.props.backLink}>
                    {/*Ikona strzałki w lewo*/}
                </Back>
                <Span>
                    {this.props.label}
                </Span>
                <Menu onClick={this.showNavHandler}>
                    {/*Ikona trzech kropek pionowo*/}
                </Menu>
                <NavMenu showNav={this.state.showNav}
                         hideNavHandler={this.hideNavHandler}/>
            </Header>
        );
    }
}

export default NavHeader;