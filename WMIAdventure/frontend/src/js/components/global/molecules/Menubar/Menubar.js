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
                            <MenubarEntry image={homeIcon}>Strona Główna</MenubarEntry>
                            <MenubarEntry image={battleIcon}>Tryb Battle</MenubarEntry>
                            <MenubarEntry image={cardIcon}>Edytor Kart</MenubarEntry>
                            <Line/>
                            <MenubarEntry image={bugIcon}>Zgłoś błąd</MenubarEntry>
                            <MenubarEntry image={githubIcon}>GitHub</MenubarEntry>
                        </List>

                        <List>
                            <MenubarEntry image={logoutIcon}>Wyloguj</MenubarEntry>
                            <Line/>
                            <TinyUserProfile displayedUsername={'test'}/>
                        </List>
                    </ContentContainer>
                </Div>
            </>
        )
    }
}

export default Menubar;