import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({theme}) => theme.colors.whiteAlmost};
  margin-bottom: 20px;
`;

export default Div;