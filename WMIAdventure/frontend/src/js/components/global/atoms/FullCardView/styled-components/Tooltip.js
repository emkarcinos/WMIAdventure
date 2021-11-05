import styled from 'styled-components';

const Tooltip = styled.p`
  margin: 0 0 20px 0;
  font-size: 12px;
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.regular};
  font-style: italic;
  text-transform: uppercase;
  max-width: 200px;
  text-align: center;
  color: ${({theme}) => theme.colors.dark};
  overflow-wrap: anywhere;
  padding: 0 6px;
`;

export default Tooltip;