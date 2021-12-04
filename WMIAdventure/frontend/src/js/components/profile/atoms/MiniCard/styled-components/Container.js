import styled from 'styled-components';

function colorHandle(theme, level) {
    switch (level) {
        case 2:
            return theme.colors.yellowyOrangy;
        case 3:
            return theme.colors.purplyPinky;
        default:
            return theme.colors.greenyBluey;
    }
}

const Container = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  width: 54px;
  height: 64px;
  border-radius: ${({borderDown}) => borderDown ? '0 0 16px 16px' : '16px 16px 0 0'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({theme, level}) => colorHandle(theme, level)};
`;

export default Container;