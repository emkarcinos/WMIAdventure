import styled from 'styled-components';

const Container = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  width: 228px;
  height: 136px;
  
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});
`;

export default Container;