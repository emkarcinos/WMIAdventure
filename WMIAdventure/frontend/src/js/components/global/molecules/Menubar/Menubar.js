import React from "react";
import Div from "./styled-components/Div";
import ContentContainer from "./styled-components/ContentContainer";
import List from "./styled-components/List";
import TinyUserProfile from "../../../battle/molecules/TinyUserProfile";
import TransparentBack from "../../../prototype/atoms/NavMenu/styled-components/TransparentBack";
import {Transition} from "react-transition-group";
import Back from "./styled-components/Back";
import Line from "./styled-components/Line";
import MenubarEntry from "./styled-components/MenubarEntry";
import battleIcon from '../../../../../assets/images/battleIconMedium.png'
import homeIcon from '../../../../../assets/images/home.png'
import cardIcon from '../../../../../assets/images/cardIcon.png'
import bugIcon from '../../../../../assets/images/bug.png'
import githubIcon from '../../../../../assets/images/github.png'
import logoutIcon from '../../../../../assets/images/logout.png'
import userIcon from '../../../../../assets/icons/user.svg'
import newUserIcon from '../../../../../assets/icons/newuser.svg'
import Link from "../../atoms/Navbar/styled-components/Link";
import Href from "../../atoms/Navbar/styled-components/Href";
import {getCurrentUserData} from "../../../../storage/user/userData";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";

/* Transition timeout values */
const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};


/**
 * Props:
 * - closeHandler
 * - show
 */
class Menubar extends React.Component {

    state = {
        user: null,
    }

    componentDidMount() {
        getCurrentUserData()
            .then(data => data ? this.setState({
                user: {
                    id: data.user,
                    username: data.displayedUsername,
                    semester: data.semester,
                    image: data.image
                }
            }) : null);
    }

    checkIfUserLoggedIn = () => {
        UsersAPIGateway.isUserLoggedIn()
            .then(userLoggedIn => this.setState({userLoggedIn: userLoggedIn}));
    }

    logoutHandler = (event) => {
        event.preventDefault();
        UsersAPIGateway.logout();
        this.checkIfUserLoggedIn();
        alert("You've been logged out.");

        this.setState({user: null});
    }


    getAuthDependantContent = () => {
        if (this.state.user) {
            return (
                <>
                    <MenubarEntry image={userIcon}>Mój profil</MenubarEntry>
                    <MenubarEntry onClick={this.logoutHandler} image={logoutIcon}>Wyloguj</MenubarEntry>
                    <Line/>
                    <TinyUserProfile displayedUsername={this.state.user.username}
                                     avatar={this.state.user.image}
                                     term={this.state.user.semester}
                                     level={5}
                                     rank={1}
                    />
                </>
            );
        }

        return (
            <>
                <MenubarEntry as={Link} to={'/login'} image={userIcon}>Zaloguj się</MenubarEntry>
                <MenubarEntry as={Link} to={'/registration'} image={newUserIcon}>Stwórz konto</MenubarEntry>
            </>
        )
    }

    render() {
        return (
            <>
                <Transition in={this.props.show} timeout={timeout}>
                    {state => (
                        <TransparentBack onClick={this.props.closeHandler} transitionState={state}>

                        </TransparentBack>
                    )}
                </Transition>
                <Div visible={this.props.show}>
                    <ContentContainer>
                        <List>

                            <Back onClick={this.props.closeHandler}/>
                            <MenubarEntry as={Link} to={'/'} image={homeIcon}>Strona Główna</MenubarEntry>
                            <MenubarEntry as={Link} to={'/battle'} image={battleIcon}>Tryb Battle</MenubarEntry>
                            <MenubarEntry as={Link} to={'/cards-creator-start'} image={cardIcon}>Edytor
                                Kart</MenubarEntry>
                            <Line/>
                            <MenubarEntry
                                as={Href}
                                href={'https://github.com/emkarcinos/WMIAdventure/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+'}
                                target={'_blank'} rel={'noopener noreferrer'}
                                image={bugIcon}>Zgłoś sugestię</MenubarEntry>
                            <MenubarEntry
                                as={Href}
                                href={'https://github.com/emkarcinos/WMIAdventure'}
                                target={'_blank'} rel={'noopener noreferrer'}
                                image={githubIcon}>GitHub</MenubarEntry>
                        </List>

                        <List>
                            {this.getAuthDependantContent()}
                        </List>
                    </ContentContainer>
                </Div>
            </>
        )
    }
}

export default Menubar;