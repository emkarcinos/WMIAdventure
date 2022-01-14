import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
`;

export default H2;