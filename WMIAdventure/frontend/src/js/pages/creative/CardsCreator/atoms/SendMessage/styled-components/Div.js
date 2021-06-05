import styled from 'styled-components';

const Div = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.ui01};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Div;