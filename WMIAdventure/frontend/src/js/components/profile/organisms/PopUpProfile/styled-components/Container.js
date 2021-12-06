import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 520px;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  transform: translateY(${({setTranslateX}) => setTranslateX ? setTranslateX : '-100vh'});
  transition: transform 0.5s ease-in-out;
  background-color: ${({theme}) => theme.colors.light2};
  z-index: 1000;
  position: relative;
`;

export default Container;