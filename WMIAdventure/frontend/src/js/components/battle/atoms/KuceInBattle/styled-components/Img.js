import styled from 'styled-components';

const Img = styled.img`
  display: ${({visible}) => visible ? 'block' : 'none'};
  transition: transform 0.5s ease-in-out;
  transform: scale(${({setScale}) => setScale ? setScale : '0'});
  width: 166px;
  height: 182px;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 246px;
    height: 270px;
  }
`;

export default Img;