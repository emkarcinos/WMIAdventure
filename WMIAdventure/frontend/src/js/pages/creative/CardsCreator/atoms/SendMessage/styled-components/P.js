import styled from 'styled-components';

const P = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  color: ${({success, theme}) => success ? theme.colors.uiGreen : 'red'};
`;

export default P;