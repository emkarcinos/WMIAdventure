import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({theme}) => theme.colors.ui01};
  overflow-wrap: anywhere;
  max-width: 400px;
`;

export default H1;