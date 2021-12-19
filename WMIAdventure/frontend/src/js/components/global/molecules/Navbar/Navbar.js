import React from "react";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import menuIcon from '../../../../../assets/icons/menu2.svg';
import homeIcon from '../../../../../assets/icons/home.svg'
import Nav from "./styled-components/Nav";
import Back from "./styled-components/Back";
import Div from "./styled-components/Div";
import NavButton from "./styled-components/NavButton";
import Link from "./styled-components/A";
import Menubar from "../Menubar";
import Logo from "../../atoms/Logo";
import {isLoggedIn} from "../../../../storage/user/userData";
import withRouter from "react-router-dom/es/withRouter";
import {getPagenameByLink} from "../../../../pages/PageNames";
import {purge} from "../../../../storage/cache/cache";

/**
 * Props:
 * - backLink
 * - label
 */
class Navbar extends React.Component {

    state = {
        menuActive: false,
        isUserLoggedIn: false,
    }

    showMenuHandler = () => {
        this.setState({menuActive: !this.state.menuActive})
    }

    closeHandler = () => {
        this.setState({menuActive: false})
    }

    componentDidMount() {
        isLoggedIn()
            .then(resp => {
                this.setState({isUserLoggedIn: resp})
            });
        window.onbeforeunload = () => {
            purge();
        };
    }

    isHome = () => this.props.location.pathname === '/' || this.props.location.pathname === '/main'

    mobileNavbar = () => {
        return (
            <Nav>
                <Div>
                    {!this.isHome() ?
                        <>
                            <Back onClick={this.props.history.goBack}/>
                            {getPagenameByLink(this.props.location.pathname)}
                        </> :
                        <Logo link={this.state.isUserLoggedIn ? '/main' : '/'}/>}
                </Div>
                <Div>
                    <NavButton as={Link} to={this.state.isUserLoggedIn ? '/main' : '/'} image={homeIcon}/>
                    <NavButton onClick={this.showMenuHandler} image={menuIcon}/>
                </Div>
            </Nav>
        )

    }

    desktopNavbar = () => {
        return (
            <Nav>
                <Logo link={this.state.isUserLoggedIn ? '/main' : '/'} fullVersion/>
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

export default withRouter(Navbar);