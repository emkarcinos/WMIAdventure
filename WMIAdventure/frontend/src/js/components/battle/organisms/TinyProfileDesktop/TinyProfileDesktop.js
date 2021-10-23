import React from 'react';
import Div from './styled-components/Div';
import TinyUserProfile from '../../molecules/TinyUserProfile';

class TinyProfileDesktop extends React.Component {
    render() {
        return (
            <Div>
                {/*TinyUserProfile w wersji desktop*/}
                {/*trójkąt z UserInfo*/}
                {/*TinyCards w wersji desktop*/}

                <TinyUserProfile displayedUsername={'skromnośćToPotęga'} setMargin={'24px 0 0 0'}
                                 term={7} level={50} rank={2} avatar={null}/>
            </Div>
        );
    }
}

export default TinyProfileDesktop;