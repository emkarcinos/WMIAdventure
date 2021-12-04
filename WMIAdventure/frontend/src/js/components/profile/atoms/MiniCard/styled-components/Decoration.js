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

const Decoration = styled.div`
  width: 100%;
  height: 10px;
  border-radius: ${({borderDown}) => borderDown ? '0 0 16px 16px' : '16px 16px 0 0'};
  position: absolute;
  top: ${({borderDown}) => borderDown ? 'calc(100% - 10px)' : '0'};
  background-color: ${({theme, level}) => colorHandle(theme, level)};
`;

export default Decoration;