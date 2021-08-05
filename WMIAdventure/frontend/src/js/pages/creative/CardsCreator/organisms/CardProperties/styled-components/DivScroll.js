import styled from 'styled-components';

function handleExist(rank) {
    if(rank !== 0)
        return '10px';
    return '0';
}

const DivScroll = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding-top: ${({rank}) => handleExist(rank)};
`;

export default DivScroll;