import React from 'react';
import Div from './styled-components/Div';
import Img from './styled-components/Img';
import Vs from './styled-components/Vs';
import kuc1 from '../../../../../assets/icons/kuc1.svg';
import kuc2 from '../../../../../assets/icons/kuc2.svg';

class KuceVs extends React.Component {
    render() {
        return (
            <Div>
                <Img src={kuc1} alt="" />
                <Vs>
                    VS
                </Vs>
                <Img src={kuc2} alt="" />
            </Div>
        );
    }
}

export default KuceVs;