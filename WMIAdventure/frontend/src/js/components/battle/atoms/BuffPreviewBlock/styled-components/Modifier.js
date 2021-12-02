import styled from 'styled-components';

const Modifier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 16px 16px;
  color: ${({theme}) => theme.colors.dark};
  background-color: ${({theme}) => theme.colors.light2};
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  font-size: 24px;
  width: 100%;
  height: 30px;
`;

export default Modifier;