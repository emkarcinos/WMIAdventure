import styled from 'styled-components';

function gapHandle(childrenCount) {
    if(childrenCount > 4) return '2px';
    else if(childrenCount > 3) return '8px';
    else return '12px';
}

const EffectIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.5s, opacity 0.4s ease-in-out;
  transform: scale(${({setScale}) => setScale ? setScale : '0'})
  translateY(${({setTranslateY}) => setTranslateY ? setTranslateY : '0'});
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};
  gap: ${({childrenCount}) => gapHandle(childrenCount)};
`;

export default EffectIconsContainer;