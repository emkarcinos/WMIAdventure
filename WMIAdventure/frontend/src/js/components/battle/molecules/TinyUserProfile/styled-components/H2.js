import styled from 'styled-components';

const H2 = styled.h2`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.uiBlue};
`;

export default H2;