import styled from 'styled-components';

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  order: -1;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
`;

export default LogoImage;