import styled from 'styled-components';

function colorHandler(theme, access, activeCommon, activeGold, activeEpic) {
    if(activeCommon || activeGold || activeEpic)
        return theme.colors.ui01;
    if(access)
        return theme.colors.ui07;
    else
        return theme.colors.grey3;
}

function backgroundHandler(theme, access, activeCommon, activeGold, activeEpic) {

    if(activeEpic)
        return theme.colors.epic;
    else if(activeGold)
        return theme.colors.gold;
    else if(activeCommon)
        return theme.colors.common;

    if(access)
        return theme.colors.grey1;
    else
        return theme.colors.grey2;
}

const Button = styled.button`
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.bold};
  padding: 0;
  margin: 0;
  border: none;
  color: ${({theme, access, activeCommon, activeGold, activeEpic}) => colorHandler(theme, access, activeCommon, activeGold, activeEpic)};
  background-color: ${({theme, access, activeCommon, activeGold, activeEpic}) => backgroundHandler(theme, access, activeCommon, activeGold, activeEpic)};
  //background-color: ${({access, theme}) => access ? theme.colors.grey1 : theme.colors.grey2};
`;

export default Button;