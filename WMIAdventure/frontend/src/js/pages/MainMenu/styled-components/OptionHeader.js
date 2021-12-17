import styled from 'styled-components';

const OptionHeader = styled.p`
  margin: 0;
  font-size: 32px;
  font-weight: ${({theme}) => theme.weight.bold};
  font-family: Hack, monospace;
  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;
`;

export default OptionHeader;