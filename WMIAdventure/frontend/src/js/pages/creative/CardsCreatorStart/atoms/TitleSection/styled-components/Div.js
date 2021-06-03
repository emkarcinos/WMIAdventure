import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({theme}) => theme.colors.ui01};
  margin-bottom: 32px;
`;

export default Div;