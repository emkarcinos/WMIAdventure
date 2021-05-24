import styled from 'styled-components';
import Ul from './Ul';

function showHandler(activeCardRank) {
    if(activeCardRank === 1) {
        return 'flex';
    }
    return 'none';
}

const UlCommon = styled(Ul)`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
`;

export default UlCommon;