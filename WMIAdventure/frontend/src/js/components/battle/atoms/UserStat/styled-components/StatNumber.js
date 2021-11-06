import styled from 'styled-components';

const StatNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-bottom-left-radius: 76px;
  border-top-left-radius: 76px;
  color: ${({theme}) => theme.colors.whiteAlmost};
  background-color: ${({theme}) => theme.colors.dark};
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) => theme.weight.regular};
  z-index: 2;
  position: relative;
`;

export default StatNumber;