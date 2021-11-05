import React from 'react';
import {desktop, mobile} from "../../../../utils/globals";
import Media from "react-media";
import PopUp from "../../../global/organisms/PopUp";

class BattleView extends React.Component {
    render() {
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.battleView} disableClose
                           closeHandler={this.props.closeHandler}
                           setTranslateY={this.props.setTranslateY}>

                    </PopUp>
                </Media>

                <Media query={desktop}>
                </Media>
            </>
        );
    }
}

export default BattleView;