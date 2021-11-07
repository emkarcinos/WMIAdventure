import styled from 'styled-components';

function handleFontSize(number) {
    if(number >= 3)
        return '14px';
    else return '16px';
}

const StatisticNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 100%;
  border-bottom-left-radius: 76px;
  border-top-left-radius: 76px;
  color: ${({theme}) => theme.colors.whiteAlmost};
  background-color: ${({theme}) => theme.colors.dark};
  font-family: 'Roboto', sans-serif;
  font-size: ${({numberLength}) => handleFontSize(numberLength)};
  font-weight: ${({theme}) => theme.weight.light};
  z-index: 2;
  position: relative;
  padding: 1px 0 0 2px;
`;

export default StatisticNumber;