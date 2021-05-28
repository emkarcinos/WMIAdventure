import styled from 'styled-components';
import Ul from './Ul';

function showHandler(activeCardRank) {
    if(activeCardRank === 2) {
        return 'flex';
    }
    return 'none';
}

const UlGold = styled(Ul)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default UlGold;