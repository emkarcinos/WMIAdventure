import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerGold(rank) {
    if(rank === 2)
        return 'grid';
    return 'none'
}

function createLevelHandler(createLevel) {
    if(createLevel)
        return 'grid';
    return 'none';
}

const UlGold = styled(Ul)`
  @media (max-width: 768px) {
    display: ${({rank}) => rankHandlerGold(rank)};
  }
  @media (min-width: 768px) {
    display: ${({createLevel}) => createLevelHandler(createLevel)};
  }
`;

export default UlGold;