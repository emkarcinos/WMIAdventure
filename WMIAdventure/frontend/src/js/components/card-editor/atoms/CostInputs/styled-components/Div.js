import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  width: 100%;
  height: 48px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.ui01};
  margin-bottom: 16px;
`;

export default Div;