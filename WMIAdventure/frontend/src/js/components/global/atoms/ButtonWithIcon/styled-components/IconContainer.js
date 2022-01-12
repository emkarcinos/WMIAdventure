import styled from 'styled-components';

function backgroundColorChoose(color, theme, access) {
    if (!access)
        return theme.colors.darkGray;
    else if (color)
        return color;
    else
        return theme.colors.greenyBluey;
}

const IconContainer = styled.div`
  background-color: ${({color, theme, access}) => backgroundColorChoose(color, theme, access)};
  height: 32px;
  width: 36px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 360px) {
    height: 36px;
  }
`;

export default IconContainer;