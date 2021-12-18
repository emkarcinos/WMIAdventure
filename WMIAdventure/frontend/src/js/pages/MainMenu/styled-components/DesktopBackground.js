import styled from 'styled-components';

const DesktopBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.greenyBluey};
`;

export default DesktopBackground;