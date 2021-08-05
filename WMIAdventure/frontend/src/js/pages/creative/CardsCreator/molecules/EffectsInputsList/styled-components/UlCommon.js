import styled from 'styled-components';
import Ul from './Ul';

function rankHandlerCommon(rank) {
    if(rank === 1)
        return 'grid';
    return 'none'
}

function createLevelHandler(createLevel) {
    if(createLevel)
        return 'grid';
    return 'none';
}

const UlCommon = styled(Ul)`
  @media (max-width: 768px) {
    display: ${({rank}) => rankHandlerCommon(rank)};
  }
  @media (min-width: 768px) {
    display: ${({createLevel}) => createLevelHandler(createLevel)};
  }
`;

export default UlCommon;