import styled from 'styled-components';

const Name = styled.p`
  color: ${({theme}) => theme.colors.borderLine};
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0 0 4px 0;
  max-width: 280px;
  text-align: start;
`;

export default Name;