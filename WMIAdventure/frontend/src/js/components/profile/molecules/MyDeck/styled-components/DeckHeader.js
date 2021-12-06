import styled from 'styled-components';

const DeckHeader = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 48px;
  text-transform: uppercase;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.light2};
  margin: 0;
`;

export default DeckHeader;