import styled from 'styled-components';

const Tooltip = styled.p`
  font-size: 12px;
  font-weight: 200;
  color: ${({theme}) => theme.colors.grey3};
  padding: 0;
  margin: 0;
  max-width: 260px;
  line-height: 16px;
  text-align: start;
  color: ${({theme}) => theme.colors.borderLine};
`;

export default Tooltip;