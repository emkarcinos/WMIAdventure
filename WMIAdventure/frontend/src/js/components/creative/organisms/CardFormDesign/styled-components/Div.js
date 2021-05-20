import styled from 'styled-components';

const Div = styled.div`
  width: 411px;
  height: 824px;
  margin-top: 64px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px dashed ${({theme}) => theme.colors.brand01};
`;

export default Div;