import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';

class CardProperties extends React.Component {
    render() {
        return (
            <Fieldset>
                <Div>
                    <P>
                        Poziomy:
                    </P>
                    <Button>
                        {/*ikona plusa*/}
                    </Button>
                </Div>
            </Fieldset>
        );
    }
}

export default CardProperties;