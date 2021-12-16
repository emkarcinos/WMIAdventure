import styled from 'styled-components';

const H1 = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-family: Hack, monospace;
  color: ${({theme}) => theme.colors.dark};
  font-size: ${({setFontSize}) => setFontSize ? setFontSize : '20px'};
  font-weight: ${({theme}) => theme.weight.bold};
`;

export default H1;