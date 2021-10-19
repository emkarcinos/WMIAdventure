import styled from 'styled-components';

const transitionStates = {
    entering: {opacity: 0, display: 'flex'},
    entered: {opacity: 1, display: 'flex'},
    exiting: {opacity: 0, display: 'flex'},
    exited: {opacity: 0, display: 'none'},
}

const TransparentBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  justify-content: center;
  align-items: center;
  
  background-color: ${({theme}) => theme.colors.transBack};
  width: 100%;
  height: 100%;
  z-index: 3;

  opacity: 0;
  transition: opacity 0.5s ease;
  ${
          ({transitionState}) => transitionStates[transitionState]
  }
`;

export default TransparentBack;