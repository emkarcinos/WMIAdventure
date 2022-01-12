import styled from 'styled-components';

const Description = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
  max-width: 154px;
`;

export default Description;