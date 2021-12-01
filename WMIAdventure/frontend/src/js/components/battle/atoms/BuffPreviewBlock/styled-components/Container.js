import styled from 'styled-components';

function colorHandle(theme, type) {
    switch (type) {
        case null:
            return theme.colors.red;
        case 1:
            return theme.colors.red;
        case 2:
            return theme.colors.purplyPinky;
        case 5:
            return theme.colors.yellowyOrangy;
        case 6:
            return theme.colors.greenyBluey;
        default:
            return theme.colors.purplyPinky;
    }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;
  width: 64px;
  height: 72px;
  overflow: hidden;
  border: 1px solid ${({theme, type}) => colorHandle(theme, type)};
  background-color: ${({theme, type}) => colorHandle(theme, type)};
`;

export default Container;