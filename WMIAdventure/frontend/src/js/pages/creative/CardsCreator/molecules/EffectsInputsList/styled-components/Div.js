import styled from 'styled-components';

function showHandler(activeCardRank) {
    if(activeCardRank !== 0)
        return 'grid';
    return 'none';
}

const Div = styled.div`
  display: ${({activeCardRank}) => showHandler(activeCardRank)};
  grid-template-columns: auto;
  grid-row-gap: 10px;
  width: 100%;
  background-color: transparent;
  margin: 0;
`;

export default Div;