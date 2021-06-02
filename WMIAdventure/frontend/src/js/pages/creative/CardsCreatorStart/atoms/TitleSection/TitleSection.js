import React from 'react';
import H1 from './styled-components/H1';
import P from './styled-components/P';
import Div from './styled-components/Div';

class TitleSection extends React.Component {
    render() {
        return (
            <Div>
                <H1>
                    Karty!
                </H1>
                <P>
                    Skoro tu jesteś, to pewnie zależy
                    Ci na jeszcze bardziej epickich
                    pojedynkach ze studentami!
                    Kolejne karty dadzą Wam kolejne
                    narzędzie do miażdżenia przeciwników!
                </P>
            </Div>
        );
    }
}

export default TitleSection;