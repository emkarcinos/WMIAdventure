import styled, {keyframes} from 'styled-components';

const Animation = keyframes`
  from {
    transform: translateY(-300px);
  } 
  to {
    transform: translateY(0);
  }
`;

const Fieldset = styled.fieldset`
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${Animation} .6s ease-in-out;
`;

export default Fieldset;