import React from 'react';
import StyledStatistic from './StyledStatistic';

function Statistic() {
    return (
        <StyledStatistic>
            <StyledStatistic.Header>
                Statystyki
            </StyledStatistic.Header>
            <StyledStatistic.Table>
                <StyledStatistic.Column>
                    <StyledStatistic.Row>
                        <b>
                            Pozycja
                        </b>
                    </StyledStatistic.Row>
                    <StyledStatistic.Row>
                        Punkty
                    </StyledStatistic.Row>
                    <StyledStatistic.Row>
                        Stoczone pojedynki
                    </StyledStatistic.Row>
                    <StyledStatistic.Row>
                        Wygrane pojedynki
                    </StyledStatistic.Row>
                </StyledStatistic.Column>
                <StyledStatistic.Column>
                    <StyledStatistic.Row textEnd>
                        <b>
                            #1
                        </b>
                    </StyledStatistic.Row>
                    <StyledStatistic.Row textEnd>
                        999
                    </StyledStatistic.Row>
                    <StyledStatistic.Row textEnd>
                        151
                    </StyledStatistic.Row>
                    <StyledStatistic.Row textEnd>
                        28 (76%)
                    </StyledStatistic.Row>
                </StyledStatistic.Column>
            </StyledStatistic.Table>
        </StyledStatistic>
    );
}

export default Statistic;