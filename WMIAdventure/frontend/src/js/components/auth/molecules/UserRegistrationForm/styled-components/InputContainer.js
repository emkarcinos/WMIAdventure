import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.light3};
  margin: 0 auto 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default InputContainer;