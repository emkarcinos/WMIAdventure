import styled from 'styled-components';

const Back = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.ui04};
  padding: 12px 24px;
  margin: 0;
  font-size: 24px;
  cursor: pointer;
`;

export default Back;