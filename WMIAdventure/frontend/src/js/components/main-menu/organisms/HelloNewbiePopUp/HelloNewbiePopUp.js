import React from 'react';
import PopUp from "../../../global/organisms/PopUp";
import TransparentBack from "./styled-components/TransparentBack";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import H2 from "./styled-components/H2";
import P from "./styled-components/P";
import theme from "../../../../utils/theme";
import fast from '../../../../../assets/icons/fast.svg';
import xClose from '../../../../../assets/icons/x-close.svg';
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";

class HelloNewbiePopUp extends React.Component {
    componentDidMount() {
        this.props.open();
    }

    renderContent() {
        return (
            <ColumnGapContainer setPadding={'32px 20px 20px'} gap={'24px'}>
                <H2>
                    Witaj nowy!
                </H2>
                <P>
                    Nie znasz jeszcze WMI Adventure?
                    Przygotowaliśmy dla Ciebie samouczek,
                    który zrobi z Ciebie godnego kandydata do podbijania wydziału.
                    Jeżeli znasz już podstawy, możesz go pominąć.
                </P>
                <FlexGapContainer gap={'30px'}>
                    <ButtonWithIcon handler={this.props.close} icon={xClose} color={theme.colors.dark}>
                        Pomiń
                    </ButtonWithIcon>
                    <ButtonWithIcon handler={this.props.goToTutorial} icon={fast}
                                    color={theme.colors.greenyBluey}>
                        Samouczek
                    </ButtonWithIcon>
                </FlexGapContainer>
            </ColumnGapContainer>
        );
    }

    render() {
        return (
            <TransparentBack visible={this.props.visible} setOpacity={this.props.setTransBackOpacity}>
                <>
                    <Media query={mobile}>
                        <PopUp visible setMaxWidth={'368px'} setPosition={'static'}
                               setTranslateY={this.props.setTranslateY}
                               setWidth={'100%'} setHeight={'308px'} borderRadius closeHandler={this.props.close}>
                            {this.renderContent()}
                        </PopUp>
                    </Media>
                    <Media query={desktop}>
                        <PopUp visible setMaxWidth={'470px'} setPosition={'static'}
                               setTranslateY={this.props.setTranslateY}
                               setWidth={'100%'} setHeight={'280px'} borderRadius closeHandler={this.props.close}>
                            {this.renderContent()}
                        </PopUp>
                    </Media>
                </>

            </TransparentBack>
        );
    }
}

export default HelloNewbiePopUp;