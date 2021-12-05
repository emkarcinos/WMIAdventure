import styled from 'styled-components';

const P = styled.p`
  margin: 0;
  padding: 0 10px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.medium};
`;

export default P;