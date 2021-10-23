import styled from 'styled-components';

const LevelNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-bottom-left-radius: 76px;
  border-top-left-radius: 76px;
  color: ${({theme}) => theme.colors.ui01};
  background-color: ${({theme}) => theme.colors.darkgrey};
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) => theme.weight.regular};
`;

export default LevelNumber;