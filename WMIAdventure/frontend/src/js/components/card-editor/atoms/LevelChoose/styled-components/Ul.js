import styled, {keyframes} from 'styled-components';

const Animation = keyframes`
  from {
    transform: translateY(300px);
  } 
  to {
    transform: translateY(0);
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${Animation} .6s ease-in-out;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border: none;
  padding: 20px;
  margin: 0;
  width: 100%;
  height: 200px;
`;

export default Ul;