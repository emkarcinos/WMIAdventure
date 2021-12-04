import React from "react";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import menuIcon from '../../../../../assets/icons/menu2.svg';
import homeIcon from '../../../../../assets/icons/home.svg'
import Nav from "./styled-components/Nav";
import Back from "./styled-components/Back";
import Div from "./styled-components/Div";
import NavButton from "./styled-components/NavButton";
import Link from "./styled-components/Link";
import Menubar from "../../molecules/Menubar";

/**
 * Props:
 * - backLink
 * - label
 */
class Navbar extends React.Component {

    state = {
        menuActive: false,
    }

    showMenuHandler = () => {
        this.setState({menuActive: !this.state.menuActive})
    }

    closeHandler = () => {
        this.setState({menuActive: false})
    }


    mobileNavbar = () => {
        return (
            <Nav>
                <Div>
                    {this.props.backLink ? <Back as={Link} to={this.props.backLink}/> : 'WMI'}
                    {this.props.label}
                </Div>
                <Div>
                    <NavButton as={Link} to={'/'} image={homeIcon}/>
                    <NavButton onClick={this.showMenuHandler} image={menuIcon}/>
                </Div>
            </Nav>
        )

    }

    desktopNavbar = () => {
        return (
            <Nav>

                <Link to={'/'}>
                    WMI
                </Link>
                <NavButton onClick={this.showMenuHandler} image={menuIcon}/>
            </Nav>
        );
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    {this.mobileNavbar()}
                </Media>

                <Media query={desktop}>
                    {this.desktopNavbar()}
                </Media>

                <Menubar show={this.state.menuActive} closeHandler={this.closeHandler}/>
            </>);
    }
}

export default Navbar;