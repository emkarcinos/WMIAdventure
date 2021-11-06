import styled from 'styled-components';

function activeRankBorderHandler(activeCardRank, theme) {
    if (activeCardRank === 1)
        return `4px solid ${theme.colors.greenyBluey}`;
    if (activeCardRank === 2)
        return `4px solid ${theme.colors.yellowyOrangy}`;
    if (activeCardRank === 3)
        return `4px solid ${theme.colors.purplyPinky}`;
    return '4px solid transparent';
}

const DivLevel = styled.div`
  position: absolute;
  bottom: -38px;
  left: -4px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: calc(100% + 8px);
  height: 38px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.lightGray};
  border-bottom: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};
  border-left: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};
  border-right: ${({activeCardRank, theme}) => activeRankBorderHandler(activeCardRank, theme)};

  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  -ms-overflow-style: none; /* IE 10+ */

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

export default DivLevel;