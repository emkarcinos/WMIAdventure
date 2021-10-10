import styled from 'styled-components';

const Tooltip = styled.p`
  margin: 0 0 22px 0;
  font-size: 12px;
  color: ${({theme}) => theme.colors.borderLine};
  font-weight: ${({theme}) => theme.weight.regular};
  font-style: italic;
  text-transform: uppercase;
  max-width: 120px;
  text-align: center;
  color: ${({theme}) => theme.colors.borderLine};
  overflow-wrap: anywhere;
  padding: 0 6px;
`;

export default Tooltip;