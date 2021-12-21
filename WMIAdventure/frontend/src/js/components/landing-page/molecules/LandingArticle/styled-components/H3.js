import styled from 'styled-components';

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 24px;
  max-width: 240px;
  margin: 0;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.bold};
}
`;

export default H3;