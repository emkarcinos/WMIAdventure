import React from 'react';
import Option from "../../atoms/Option";
import Logo from "../../../global/atoms/Logo";
import Container from "./styled-components/Container";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";


class ChooseAppModule extends React.Component {
    render() {
        return (
            <Container>
                <Media query={mobile}>
                    <>
                        <Option battle url={'/battle'}/>
                        <Logo setSize={'110px'} setOrder={'0'}/>
                        <Option editor url={'/cards-creator-start'}/>
                    </>
                </Media>
                <Media query={desktop}>
                    <>
                        <Option editor setSelfEnd url={'/cards-creator-start'}/>
                        <Logo setMargin={'0 0 6px 30px'} setSize={'216px'} setOrder={'0'}/>
                        <Option battle setSelfStart url={'/battle'}/>
                    </>
                </Media>
            </Container>
        );
    }
}

export default ChooseAppModule;