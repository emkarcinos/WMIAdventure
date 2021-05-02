import React from 'react';
import StyledWrapper from './StyledWrapper';
import StyledStatRow from './StyledStatRow';

function Statistic() {
    return (
        <StyledWrapper>
            <h2>
                Statystyki
            </h2>
            <table>
                <StyledStatRow>
                    <tr>
                        <b>
                            Pozycja
                        </b>
                    </tr>
                    <tr>
                        Punkty
                    </tr>
                    <tr>
                        Stoczone pojedynki
                    </tr>
                    <tr>
                        Wygrane pojedynki
                    </tr>
                </StyledStatRow>
                <StyledStatRow textEnd>
                    <tr>
                        <b>
                            #1
                        </b>
                    </tr>
                    <tr>
                        999
                    </tr>
                    <tr>
                        151
                    </tr>
                    <tr>
                        28 (76%)
                    </tr>
                </StyledStatRow>
            </table>
        </StyledWrapper>
    );
}

export default Statistic;