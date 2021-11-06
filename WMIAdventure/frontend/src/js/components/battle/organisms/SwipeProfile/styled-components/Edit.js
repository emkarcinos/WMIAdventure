import styled from 'styled-components';

const Edit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  padding: 0;
  margin: 0;
  background-color: ${({theme}) => theme.colors.light2};
  color: ${({theme}) => theme.colors.dark};
  font-weight: ${({theme}) => theme.weight.light};
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  border-radius: 18px;
  width: 62px;
  height: 30px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
`;

export default Edit;