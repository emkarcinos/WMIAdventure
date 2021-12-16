import styled from 'styled-components';

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  text-transform: uppercase;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.dark};
  text-align: center;
  z-index: 2;
  max-width: 290px;
`;

export default Subtitle;