import styled from 'styled-components';
import Div from './Div';

function showHandler(existNextCardRank, activateCardRank) {
    if(existNextCardRank && activateCardRank === 2)
        return 'flex';
    return 'none';
}

const GoldDiv = styled(Div)`
  display: ${({existNextCardRank, activateCardRank}) => showHandler(existNextCardRank, activateCardRank)};
`;

export default GoldDiv;