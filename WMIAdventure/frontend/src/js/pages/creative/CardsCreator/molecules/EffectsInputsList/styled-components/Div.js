import styled from 'styled-components';

/**
 * Chooses appropriate display type for mobile sized screens (max 768px).
 * @param activeCardRank Which card is active now.
 * @returns {string} Chosen display type, either grid or none.
 */
function showHandlerMobile(activeCardRank) {
    if(activeCardRank !== 0)
        return 'grid';
    return 'none';
}

const Div = styled.div`
  display: grid;
  @media (max-width: 768px){
    display: ${({activeCardRank}) => showHandlerMobile(activeCardRank)};
  }
  grid-template-columns: auto;
  grid-row-gap: 10px;
  width: 100%;
  background-color: transparent;
  margin: 0;
`;

export default Div;