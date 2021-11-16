import styled from 'styled-components';

const EffectIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: transform 0.5s, opacity 0.4s ease-in-out;
  transform: translate(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'},
  ${({setTranslateY}) => setTranslateY ? setTranslateY : '0'}) 
  scale(${({setScale}) => setScale ? setScale : '1'});
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
`;

export default EffectIconsContainer;