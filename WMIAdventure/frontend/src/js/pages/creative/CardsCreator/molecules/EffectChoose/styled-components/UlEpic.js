import styled from 'styled-components';
import Ul from './Ul';

function showHandler(activeCardRank) {
    if(activeCardRank === 3) {
        return 'flex';
    }
    return 'none';
}

const UlEpic = styled(Ul)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default UlEpic;