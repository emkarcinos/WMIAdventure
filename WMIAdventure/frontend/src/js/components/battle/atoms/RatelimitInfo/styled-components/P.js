import styled from 'styled-components';

const P = styled.p`
  font-size: 12px;
  font-weight: 200;
  color: ${({theme}) => theme.colors.dark};
  padding: 0;
  margin: 0;
  max-width: 260px;
  line-height: 16px;
  text-align: start;
`;

export default P;