import styled from 'styled-components';

const P = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.uiBlue};
  font-weight: ${({theme}) => theme.weight.medium};
  font-size: 18px;
`;

export default P;