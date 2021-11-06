import styled from 'styled-components';

const TopDiv = styled.div`
  width: 100%;
  height: 42px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.uiGreen};
`;

export default TopDiv;