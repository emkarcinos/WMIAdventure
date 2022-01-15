import styled from 'styled-components';

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
  transform: scale(${({setScale}) => setScale ? setScale : '0'}) translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 90%;
    height: auto;
    max-width: 1480px;
  }
`;

export default BackgroundImg;