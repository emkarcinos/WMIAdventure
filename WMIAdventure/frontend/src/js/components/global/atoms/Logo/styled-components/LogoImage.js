import styled from 'styled-components';

const LogoImage = styled.img`
  width: ${({setSize}) => setSize ? setSize : '40px'};
  height: ${({setSize}) => setSize ? setSize : '40px'};
  order: ${({setOrder}) => setOrder ? setOrder : '-1'};
  transition: opacity 0.3s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
`;

export default LogoImage;