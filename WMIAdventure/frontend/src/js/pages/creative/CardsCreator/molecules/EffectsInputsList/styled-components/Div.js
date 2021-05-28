import styled from 'styled-components';

function showHandler(activeCardRank) {
    if(activeCardRank !== 0)
        return 'flex';
    return 'none';
}

const Div = styled.div`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
  flex-direction: column;
  width: 100%;
  background-color: transparent;
  margin: 16px 0;
`;

export default Div;