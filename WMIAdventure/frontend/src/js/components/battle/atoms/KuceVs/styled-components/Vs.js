import styled from 'styled-components';

const Vs = styled.p`
  font-size: 26px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.dark};
`;

export default Vs;