import styled from 'styled-components';

const P = styled.p`
  color: ${({theme}) => theme.colors.ui01};
  margin: ${({tooltip}) => tooltip ? '0' : '0 0 16px 0'};
  font-size: ${({tooltip}) => tooltip ? '14px' : '18px'};
`;

export default P;