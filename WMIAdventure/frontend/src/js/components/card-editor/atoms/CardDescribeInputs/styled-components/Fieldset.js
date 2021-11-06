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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  padding: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  
  animation: ${Animation} .6s ease-in-out;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
`;

export default Fieldset;