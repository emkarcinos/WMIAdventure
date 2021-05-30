import styled from 'styled-components';

const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.grey1};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 40px;
`;

export default DivInput;