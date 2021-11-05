import styled from 'styled-components';

function activeRankHandler(activeCardRank, theme) {
    if (activeCardRank === 1)
        return `4px solid ${theme.colors.greenyBluey}`;
    if (activeCardRank === 2)
        return `4px solid ${theme.colors.yellowyOrangy}`;
    if (activeCardRank === 3)
        return `4px solid ${theme.colors.purplyPinky}`;
    return '4px solid transparent';
}

function createLevelHandler(createCommon, createGold, createEpic, theme) {
    if (createCommon)
        return `4px solid ${theme.colors.greenyBluey}`;
    if (createGold)
        return `4px solid ${theme.colors.yellowyOrangy}`;
    if (createEpic)
        return `4px solid ${theme.colors.purplyPinky}`;
    return '4px solid transparent';
}

const Fieldset = styled.fieldset`
  width: 100%;

  @media (max-height: 568px) {
    height: 220px;
  }

  @media (max-height: 640px) {
    height: 320px;
  }

  @media (max-height: 800px) {
    height: 400px;
  }

  @media (min-height: 800px) {
    height: 482px;
  }

  @media (min-height: 900px) {
    height: 532px;
  }

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 16px;
  margin: 0 0 52px 0;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border: ${({activeCardRank, theme}) => activeRankHandler(activeCardRank, theme)};

  @media (min-height: 800px) {
    margin: 0 0 64px 0;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    max-width: 380px;
    height: 532px;
    margin: 0 6px 24px;
    padding: 0;
    display: ${({create}) => create ? 'flex' : 'none'};
    border: ${({createCommon, createGold, createEpic, theme}) =>
            createLevelHandler(createCommon, createGold, createEpic, theme)};
  }
`;

export default Fieldset;