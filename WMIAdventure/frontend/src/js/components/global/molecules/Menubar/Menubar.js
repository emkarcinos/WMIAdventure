import React from "react";
import Div from "./styled-components/Div";
import ContentContainer from "./styled-components/ContentContainer";
import List from "./styled-components/List";
import TinyUserProfile from "../../../battle/molecules/TinyUserProfile";
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
import Link from "../Navbar/styled-components/A";
import Href from "../Navbar/styled-components/Href";
import {getCurrentUserData} from "../../../../storage/user/userData";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import TransparentBack from "./styled-components/TransparentBack";
import Button from "./styled-components/Button";
import {Redirect} from "react-router-dom";
import {DetailedUserData, nullDetailedUserData} from "../../../../api/data-models/user/DetailedUserData";

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
        user: nullDetailedUserData(),
        willRedirect: false
    }

    populateCurrentUserData = async () => {
        const userData = await getCurrentUserData();
        if (!userData)
            return
        const user = new DetailedUserData(userData.user, userData.displayedUsername, userData.semester, userData.image, userData.level);
        user.fetchNonVitalDataFromBackend();
        this.setState({user: user});
    }

    componentDidMount() {
        this.populateCurrentUserData();
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

        this.setState({user: null, willRedirect: true});
        window.location.reload();

    }

    redirectHandler = () => {
        if (this.state.willRedirect) {
            this.setState({willRedirect: false})
            return (<Redirect to={'/'}/>);
        }
    }

    getAuthDependantContent = () => {
        if (this.state.user) {
            return (
                <>
                    <MenubarEntry as={Link} to={'/profile'} image={userIcon}>Mój profil</MenubarEntry>
                    <MenubarEntry onClick={this.logoutHandler} image={logoutIcon}>Wyloguj</MenubarEntry>
                    <Line/>
                    <Button as={Link} to={'/profile'}>
                        <TinyUserProfile user={this.state.user}/>
                    </Button>
                </>
            );
        }

        return (
            <>
                {this.redirectHandler()}
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
                        <TransparentBack onClick={this.props.closeHandler} transitionState={state}/>
                    )}
                </Transition>
                <Div visible={this.props.show}>
                    <ContentContainer>
                        <List>
                            <Back onClick={this.props.closeHandler}/>
                            {this.state.user ?
                                <>
                                    <MenubarEntry as={Link} to={'/main'} image={homeIcon}>Strona Główna</MenubarEntry>
                                    <MenubarEntry as={Link} to={'/battle'} image={battleIcon}>Tryb Battle</MenubarEntry>
                                    <MenubarEntry as={Link} to={'/cards-creator-start'} image={cardIcon}>Edytor
                                        Kart</MenubarEntry>
                                    <Line/>
                                </> : null}
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