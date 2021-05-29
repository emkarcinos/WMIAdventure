import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerGold(rank) {
    if(rank === 2)
        return 'flex';
    return 'none'
}

const UlGold = styled(Ul)`
  display: ${({rank}) => rankHandlerGold(rank)};
`;

export default UlGold;