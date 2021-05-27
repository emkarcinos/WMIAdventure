import styled from 'styled-components';

const Name = styled.p`
  color: ${({theme}) => theme.colors.ui07};
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0 0 6px 0;
  max-width: 280px;
`;

export default Name;