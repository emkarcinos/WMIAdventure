import React from 'react';
import {desktop, mobile} from "../../../../utils/globals";
import Media from "react-media";
import PopUp from "../../../global/organisms/PopUp";
import MainContainer from "./styled-components/MainContainer";
import KuceInBattle from "../../atoms/KuceInBattle";

class BattleView extends React.Component {

    state = {
        kuceInBattleVisible: false,
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.battleView} disableClose
                           closeHandler={this.props.closeHandler}
                           setTranslateY={this.props.setTranslateY}>
                        <MainContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible} />
                        </MainContainer>
                    </PopUp>
                </Media>

                <Media query={desktop}>
                </Media>
            </>
        );
    }
}

export default BattleView;