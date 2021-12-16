import styled from 'styled-components';

const ErrorMessage = styled.p`
  margin: 0;
  color: ${({theme}) => theme.colors.red};
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  text-align: center;
`;

export default ErrorMessage;