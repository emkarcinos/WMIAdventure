import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 8px;

      h2 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
      }
  
      table {
        width: 280px;
      }
`;

const StatRow = styled.td`
    width: 50%;
    padding: 8px 0;
  
    tr {
      display: inline-block;
      width: 100%;
      text-align: ${({textEnd}) => textEnd ? 'end' : 'start'};
      font-size: 14px;
      padding: 8px 0;
    }
`;


function Statistic() {
    return (
        <StyledWrapper>
            <h2>
                Statystyki
            </h2>
            <table>
                <StatRow>
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
                </StatRow>
                <StatRow textEnd>
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
                </StatRow>
            </table>
        </StyledWrapper>
    );
}

export default Statistic;