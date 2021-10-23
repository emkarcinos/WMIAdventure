import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 26px;
  text-transform: uppercase;
  text-align: center;
  font-weight: ${({theme}) => theme.weight.bold};
  margin: 80px 0 32px 0;
  color: ${({theme}) => theme.colors.light2};
`;

export default H2;