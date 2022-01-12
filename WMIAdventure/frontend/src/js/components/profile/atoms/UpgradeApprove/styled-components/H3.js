import styled from 'styled-components';

const H3 = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
`;

export default H3;