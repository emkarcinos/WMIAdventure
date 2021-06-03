import styled from 'styled-components';

function activeRankHandler(activeCardRank, theme) {
    if(activeCardRank === 1)
        return `4px solid ${theme.colors.common}`;
    if(activeCardRank === 2)
        return `4px solid ${theme.colors.gold}`;
    if(activeCardRank === 3)
        return `4px solid ${theme.colors.epic}`;
    return 'none';
}

const Fieldset = styled.fieldset`
  width: 100%;
  height: 482px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 16px;
  margin: 0 0 64px 0;
  
  background-color: ${({theme}) => theme.colors.ui01};
  border: ${({activeCardRank, theme}) => activeRankHandler(activeCardRank, theme)}
`;

export default Fieldset;