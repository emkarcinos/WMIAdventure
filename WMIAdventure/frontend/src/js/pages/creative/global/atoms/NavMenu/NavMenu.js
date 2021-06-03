import React from 'react';
import Nav from './styled-components/Nav';
import Ul from './styled-components/Ul';
import Li from './styled-components/Li';
import {Link} from 'react-router-dom';
import TransparentBack from './styled-components/TransparentBack';

class NavMenu extends React.Component {
    state = {
        navHover: false,
    }

    hoverTrue = () => {
        this.setState({navHover: true});
    }

    hoverFalse = () => {
        this.setState({navHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.navHover)
            this.props.hideNavHandler(event);
    }

    render() {
        return (
            <TransparentBack show={this.props.showNav} onClick={this.handleHiding}>
                <Nav onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                    <Ul>
                        <Li>
                            <Link to={'/'}>
                                Start
                            </Link>
                        </Li>
                    </Ul>
                </Nav>
            </TransparentBack>
        );
    }
}

export default NavMenu;