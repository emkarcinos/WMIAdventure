import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  line-height: 24px;
  color: ${({theme}) => theme.colors.dark};
  text-align: center;
  max-width: 90%;
`;

export default Paragraph;