import styled from 'styled-components';
import theme from '../../../../../utils/theme';

const transitionStates = {
  entering: {
    color: theme.colors.yellowyOrangy,
    'font-size': '24px',
  },
  entered: {
    color: theme.colors.whiteAlmost,
    'font-size': '18px',
  },
  exiting: {
  },
  exited: {
  },
}

function handleFontSize(number) {
    if (number >= 3)
        return '14px';
    else return '18px';
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
  font-weight: ${({theme}) => theme.weight.regular};
  z-index: 2;
  position: relative;
  padding: 1px 0 0 2px;


  transition-property: color, font-size;
  transition-duration: ${({animDuration}) => animDuration + 'ms'};
  transition-timing-function: ease;
  ${
    ({transitionState}) => transitionStates[transitionState]
  }
`;

export default StatisticNumber;