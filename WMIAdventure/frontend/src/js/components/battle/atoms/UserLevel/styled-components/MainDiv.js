import styled from 'styled-components';

const MainDiv = styled.div`
  height: 28px;
  width: 154px;
  border-radius: 76px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  position: relative;
`;

export default MainDiv;