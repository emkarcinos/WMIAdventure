import styled from 'styled-components';

const IconContainer = styled.div`
  background-color: ${({color, theme}) => color ? color : theme.colors.common};
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