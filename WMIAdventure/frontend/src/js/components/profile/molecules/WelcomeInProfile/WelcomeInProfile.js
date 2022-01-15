import React from 'react';
import H2 from "./styled-components/H2";
import P from "./styled-components/P";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import theme from "../../../../utils/theme";
import fast from '../../../../../assets/icons/fast.svg';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";

class WelcomeInProfile extends React.Component {
    render() {
        return (
            <ColumnGapContainer as={'section'} gap={'20px'}>
                <H2>
                    Witaj w swoim profilu!
                </H2>
                <P>
                    Od zostania mistrzem pojedynków w
                    WMI Adventure dzieli Cię ostatni krok - stworzenie swojej talii.
                </P>
                <P>
                    Kliknij na dowolną kartę, aby zamienić ją na inną.
                    Możesz też zmienić jej pozycję. Modyfikuj talię tak długo,
                    aż zaczniesz wygrywać z każdym!
                </P>
                <P>
                    Powodzenia!
                </P>
                <ButtonWithIcon color={theme.colors.greenyBluey} icon={fast} handler={this.props.close}>
                    Zakończ samouczek
                </ButtonWithIcon>
            </ColumnGapContainer>
        );
    }
}

export default WelcomeInProfile;