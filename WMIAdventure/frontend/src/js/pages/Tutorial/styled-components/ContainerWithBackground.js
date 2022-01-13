import styled from 'styled-components';

const ContainerWithBackground = styled.div`
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 24px 0;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '100vw'});
`;

export default ContainerWithBackground;