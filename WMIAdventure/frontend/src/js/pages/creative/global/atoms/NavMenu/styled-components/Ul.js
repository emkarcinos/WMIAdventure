import styled, {keyframes} from 'styled-components';

const Animation = keyframes`
  from {
    transform: translateY(-300px);
  } 
  to {
    transform: translateY(0);
  }
`;

const Ul = styled.ul`
  animation: ${Animation} .6s ease-in-out;
  background-color: ${({theme}) => theme.colors.ui01};
  margin: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export default Ul;