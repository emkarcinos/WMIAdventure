import styled from 'styled-components';

const Paragraph = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 22px;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
`;

export default Paragraph;