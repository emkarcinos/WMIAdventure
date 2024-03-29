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
import {getCurrentUserData, hasSessionCookie} from "../../../../storage/user/userData";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import TransparentBack from "./styled-components/TransparentBack";
import Button from "./styled-components/Button";
import {Redirect} from "react-router-dom";
import {DetailedUserData, nullDetailedUserData} from "../../../../api/data-models/user/DetailedUserData";
import tutorialIcon from '../../../../../assets/images/tutorial.png';

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
        willRedirect: false,
        userLoggedIn: hasSessionCookie()
    }

    populateCurrentUserData = async () => {
        const userData = await getCurrentUserData();
        if (!userData)
            return
        const user = new DetailedUserData(
            userData.user,
            userData.displayedUsername,
            userData.semester, userData.image,
            userData.level,
            userData.skill_points
        );
        await user.fetchNonVitalDataFromBackend();
        this.setState({user: user, userLoggedIn: true});
    }

    componentDidMount() {
        this.populateCurrentUserData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.state.user.fetchNonVitalDataFromBackend()
                .then(() => this.forceUpdate());
        }
    }

    checkIfUserLoggedIn = () => {
        this.setState({userLoggedIn: hasSessionCookie()});
    }

    logoutHandler = (event) => {
        event.preventDefault();
        UsersAPIGateway.logout();
        this.checkIfUserLoggedIn();

        this.setState({user: null, willRedirect: true});
        this.props.closeHandler();
        window.location.reload();

    }

    redirectHandler = () => {
        if (this.state.willRedirect) {
            this.setState({willRedirect: false})
            return (<Redirect to={'/'}/>);
        }
    }

    getAuthDependantContent = () => {
        if (this.state.userLoggedIn) {
            return (
                <>
                    <MenubarEntry as={Link} to={'/profile'} onClick={this.props.closeHandler} image={userIcon}>
                        Mój profil
                    </MenubarEntry>
                    <MenubarEntry onClick={this.logoutHandler} image={logoutIcon}>
                        Wyloguj
                    </MenubarEntry>
                    <Line/>
                    <Button as={Link} to={'/profile'} onClick={this.props.closeHandler}>
                        <TinyUserProfile user={this.state.user} showSkillPoints/>
                    </Button>
                </>
            );
        }

        return (
            <>
                {this.redirectHandler()}
                <MenubarEntry as={Link} to={'/login'} onClick={this.props.closeHandler} image={userIcon}>
                    Zaloguj się
                </MenubarEntry>
                <MenubarEntry as={Link} to={'/registration'} onClick={this.props.closeHandler} image={newUserIcon}>
                    Stwórz konto
                </MenubarEntry>
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
                            {this.state.userLoggedIn ?
                                <>
                                    <MenubarEntry as={Link} to={'/main'} onClick={this.props.closeHandler}
                                                  image={homeIcon}>Strona Główna</MenubarEntry>
                                    <MenubarEntry as={Link} to={'/battle'} onClick={this.props.closeHandler}
                                                  image={battleIcon}>Tryb Battle</MenubarEntry>
                                    <MenubarEntry as={Link} to={'/cards-creator-start'}
                                                  onClick={this.props.closeHandler} image={cardIcon}>Edytor
                                        Kart</MenubarEntry>
                                    <Line/>
                                </> : null}
                            <MenubarEntry
                                as={Link}
                                to={'/tutorial'}
                                onClick={this.props.closeHandler}
                                image={tutorialIcon}>Samouczek</MenubarEntry>
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