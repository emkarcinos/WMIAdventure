import styled from 'styled-components';

const Span = styled.span`
  color: ${({setColor, theme}) => setColor ? setColor : theme.colors.dark};
`;

export default Span;