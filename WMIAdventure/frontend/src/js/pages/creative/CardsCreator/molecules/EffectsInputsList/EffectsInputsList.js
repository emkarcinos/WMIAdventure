import React from 'react';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Ul from './styled-components/Ul';
import Button from './styled-components/Button';
import EffectInput from '../../atoms/EffectInput';

class EffectsInputsList extends React.Component {
    render() {
        return (
            <>
                <Div activeCardRank={this.props.activeCardRank}>
                    <P>
                        Efekty:
                    </P>
                    <Ul>
                        <EffectInput />
                    </Ul>
                    <Button onClick={this.props.showEffectChooseHandler}>
                        {/*plus icon*/}
                    </Button>
                </Div>

            </>
        );
    }
}

export default EffectsInputsList;