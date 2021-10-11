import styled from 'styled-components';

const Icon = styled.img`
  width: 16px;
  height: 24px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 28px;
    height: 34px;
  }
`;

export default Icon;