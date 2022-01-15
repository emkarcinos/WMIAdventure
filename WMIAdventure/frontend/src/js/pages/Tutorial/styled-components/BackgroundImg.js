import styled from 'styled-components';

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
  transform: scale(${({setScale}) => setScale ? setScale : '0'}) translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});
`;

export default BackgroundImg;