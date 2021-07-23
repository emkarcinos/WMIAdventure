import styled from 'styled-components';


const transitionStates = {
    entering: {opacity: 0, display: 'flex'},
    entered: {opacity: 1, display: 'flex'},
    exiting: {opacity: 0, display: 'flex'},
    exited: {opacity: 0, display: 'none'},
}

const TransparentBack = styled.div`
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.transBack};
  z-index: 2;

  opacity: 0;
  transition: opacity 0.5s ease;
  ${
          ({transitionState}) => transitionStates[transitionState]
  }
`;

export default TransparentBack;