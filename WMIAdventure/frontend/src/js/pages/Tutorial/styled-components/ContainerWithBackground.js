import styled from 'styled-components';

const ContainerWithBackground = styled.div`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '100vw'});
`;

export default ContainerWithBackground;