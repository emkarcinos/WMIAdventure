import React from 'react';
import Option from "../../atoms/Option";
import Logo from "../../../global/atoms/Logo";
import Container from "./styled-components/Container";

class ChooseAppModule extends React.Component {
    render() {
        return (
            <Container>
                <Option battle url={'/battle'}/>
                <Logo setSize={'110px'} setOrder={'0'}/>
                <Option editor url={'/cards-creator-start'}/>
            </Container>
        );
    }
}

export default ChooseAppModule;