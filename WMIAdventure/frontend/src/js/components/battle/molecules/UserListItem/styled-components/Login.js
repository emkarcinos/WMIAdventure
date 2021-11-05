import styled from 'styled-components';

const Login = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  font-size: 18px;
  color: ${({theme, access}) => access ? theme.colors.dark : theme.colors.lightGray};
  margin-bottom: 10px;
`;

export default Login;