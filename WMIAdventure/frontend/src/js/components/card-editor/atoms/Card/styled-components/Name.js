import styled from 'styled-components';

const Name = styled.p`
  color: ${({theme}) => theme.colors.dark};
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  padding: 0;
  margin: 0;
  max-width: 280px;
  text-align: start;
`;

export default Name;