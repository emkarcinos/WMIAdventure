import styled from 'styled-components';

const View = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: ${({theme}) => theme.weight.medium};
  color: ${({theme}) => theme.colors.uiBlue};
  text-transform: uppercase;
  margin: 0 0 36px 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 36px;
    margin: 0 0 48px 0;
  }
`;

export default View;