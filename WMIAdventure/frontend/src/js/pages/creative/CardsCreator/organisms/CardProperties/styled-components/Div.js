import styled from 'styled-components';

function activeRankBorderHandler(activeCardRank, theme) {
    if(activeCardRank === 1)
        return `4px solid ${theme.colors.common}`;
    if(activeCardRank === 2)
        return `4px solid ${theme.colors.gold}`;
    if(activeCardRank === 3)
        return `4px solid ${theme.colors.epic}`;
    return 'none';
}

function activeRankHandler(activeCardRank) {
    if(activeCardRank !== 0)
        return true;
    return false;
}

const Div = styled.div`
  position: absolute;
  bottom: -38px;
  left: ${({activeCardRank}) => activeRankHandler(activeCardRank) ? '-4px' : 0};
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: ${({activeCardRank}) => activeRankHandler(activeCardRank) ? 'calc(100% + 8px)' : '100%'};
  height: 38px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.grey2};
  border-bottom: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};
  border-left: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};
  border-right: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};
`;

export default Div;