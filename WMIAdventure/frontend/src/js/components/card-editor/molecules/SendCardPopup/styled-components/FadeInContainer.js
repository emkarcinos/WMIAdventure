import styled from 'styled-components'

const transitionStates = {
    entering: {opacity: 0, display: 'block'},
    entered: {opacity: 1, display: 'block'},
    exiting: {opacity: 0, display: 'block'},
    exited: {opacity: 0, display: 'none'},
}

const FadeInContainer = styled.div`
  transition: opacity 0.5s ease;
  ${
          ({transitionState}) => transitionStates[transitionState]
  }
`;

export default FadeInContainer;