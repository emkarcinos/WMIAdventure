import styled from 'styled-components';

const H2 = styled.h2`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.uiBlue};

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    margin: 0 0 14px 0;
  }
`;

export default H2;