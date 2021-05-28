import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 38px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.grey2};
`;

export default Div;