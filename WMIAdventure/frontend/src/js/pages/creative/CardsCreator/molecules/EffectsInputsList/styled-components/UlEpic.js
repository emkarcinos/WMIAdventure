import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerEpic(rank) {
    if(rank === 3)
        return 'grid';
    return 'none'
}

function createLevelHandler(createLevel) {
    if(createLevel)
        return 'grid';
    return 'none';
}

const UlEpic = styled(Ul)`
  @media (max-width: 768px) {
    display: ${({rank}) => rankHandlerEpic(rank)};
  }
  @media (min-width: 768px) {
    display: ${({createLevel}) => createLevelHandler(createLevel)};
  }
`;

export default UlEpic;