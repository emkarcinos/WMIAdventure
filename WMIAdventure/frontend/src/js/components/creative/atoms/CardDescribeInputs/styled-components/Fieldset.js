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
  animation: ${Animation} .6s ease-in-out;
  background-color: ${({theme}) => theme.colors.ui01};
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 20px;
  margin: 64px 0 0 0;
  width: 94%;
`;

export default Fieldset;