import React from "react";
import MenubarEntry from "../../atoms/MenubarEntry";
import Div from "./styled-components/Div";
import ContentContainer from "./styled-components/ContentContainer";
import List from "./styled-components/List";
import TinyUserProfile from "../../../battle/molecules/TinyUserProfile";
import TransparentBack from "../../../prototype/atoms/NavMenu/styled-components/TransparentBack";
import {Transition} from "react-transition-group";
import Back from "./styled-components/Back";
import Line from "./styled-components/Line";

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
                            <MenubarEntry>Entry 1</MenubarEntry>
                            <MenubarEntry>Entry 2</MenubarEntry>
                            <MenubarEntry>Entry 3</MenubarEntry>
                            <Line/>
                            <MenubarEntry>Entry 2</MenubarEntry>
                            <MenubarEntry>Entry 3</MenubarEntry>
                        </List>

                        <List>
                            <MenubarEntry>Logout</MenubarEntry>
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