import styled, {keyframes} from 'styled-components';
import swipeUp from '../../../../../../../assets/icons/swipe-up.svg';

const swipeUpSignal = keyframes`
  0% {
    transform: translateY(2px);    
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(2px);
  }
`;

const Div = styled.div`
  width: 100%;
  height: 60px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({show}) => show ? 1 : 0};
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    width: 26px;
    height: 16px;
    background-image: url(${swipeUp});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    animation: ${swipeUpSignal} 1.5s ease-in-out infinite;
  }
  
  &:after {
    content: '';
    display: block;
    width: 26px;
    height: 16px;
    background-image: url(${swipeUp});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    animation: ${swipeUpSignal} 1.5s ease-in-out infinite;
  }
`;

export default Div;