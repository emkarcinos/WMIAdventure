import styled from 'styled-components';

const Div = styled.div`
  max-width: 411px;
  max-height: 824px;
  width: 100%;
  height: 100vh;
  margin-top: 64px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px dashed ${({theme}) => theme.colors.brand01};
`;

export default Div;