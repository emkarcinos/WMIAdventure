import styled from 'styled-components';

const Container = styled.div`
  border-top-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-top-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-left-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-right-radius: ${({user}) => user ? '16px' : '0'};
  background-color: ${({theme}) => theme.colors.light2};
  min-width: 226px;
  height: 136px;
  width: 60%;
  max-width: 380px;
  
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});
`;

export default Container;