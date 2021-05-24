import React from 'react';
import UlCommon from './styled-components/UlCommon';
import UlGold from './styled-components/UlGold';
import UlEpic from './styled-components/UlEpic';
import TransparentBack from './styled-components/TransparentBack';

class EffectChoose extends React.Component {

    state = {
        listHover: false,
    }

    hoverTrue = () => {
        this.setState({listHover: true});
    }

    hoverFalse = () => {
        this.setState({listHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.listHover)
            this.props.hideEffectChooseHandler(event);
    }

    render() {
        return (
            <>
                <TransparentBack show={this.props.showEffectChoose} onClick={this.handleHiding}>
                    <UlCommon onMouseEnter={this.hoverTrue}
                              onMouseLeave={this.hoverFalse}
                              activeCardRank={this.props.activeCardRank}>
                        effect choose
                    </UlCommon>
                    <UlGold onMouseEnter={this.hoverTrue}
                            onMouseLeave={this.hoverFalse}
                            activeCardRank={this.props.activeCardRank}>
                        effect choose
                    </UlGold>
                    <UlEpic onMouseEnter={this.hoverTrue}
                            onMouseLeave={this.hoverFalse}
                            activeCardRank={this.props.activeCardRank}>
                        effect choose
                    </UlEpic>
                </TransparentBack>
            </>
        );
    }
}

export default EffectChoose;