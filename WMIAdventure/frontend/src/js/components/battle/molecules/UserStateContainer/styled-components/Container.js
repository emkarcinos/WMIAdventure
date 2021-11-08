import styled from 'styled-components';

const Container = styled.div`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  min-width: 226px;
  height: 136px;
  width: 60%;
  max-width: 380px;
  
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});
`;

export default Container;