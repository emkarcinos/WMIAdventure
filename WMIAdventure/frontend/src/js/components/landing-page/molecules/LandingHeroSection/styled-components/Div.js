import styled from 'styled-components';
import background from '../../../../../../assets/images/desktop-landing-background.png';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 100%;
    height: auto;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: contain;
    aspect-ratio: 16 / 9;
  }
`;

export default Div;