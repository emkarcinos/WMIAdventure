import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 20px;
  max-width: 290px;
  text-align: center;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: ${({theme}) => theme.colors.text01};
`;

export default H2;