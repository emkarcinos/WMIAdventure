import styled from 'styled-components';

function colorHandler(theme, access, activeCommon, activeGold, activeEpic) {
    if (activeCommon || activeGold || activeEpic)
        return theme.colors.whiteAlmost;
    if (access)
        return theme.colors.dark;
    else
        return theme.colors.darkGray;
}

function backgroundHandler(theme, access, activeCommon, activeGold, activeEpic) {

    if (activeEpic)
        return theme.colors.purplyPinky;
    else if (activeGold)
        return theme.colors.yellowyOrangy;
    else if (activeCommon)
        return theme.colors.greenyBluey;

    if (access)
        return theme.colors.light2;
    else
        return theme.colors.lightGray;
}

const Button = styled.button`
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: ${({theme}) => theme.weight.bold};
  padding: 0;
  margin: 0;
  border: none;
  color: ${({
              theme,
              access,
              activeCommon,
              activeGold,
              activeEpic
            }) => colorHandler(theme, access, activeCommon, activeGold, activeEpic)};
  background-color: ${({
                         theme,
                         access,
                         activeCommon,
                         activeGold,
                         activeEpic
                       }) => backgroundHandler(theme, access, activeCommon, activeGold, activeEpic)};
    //background-color: ${({access, theme}) => access ? theme.colors.light2 : theme.colors.lightGray};
`;

export default Button;