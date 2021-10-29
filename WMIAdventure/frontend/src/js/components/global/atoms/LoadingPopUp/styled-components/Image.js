import styled, {keyframes} from 'styled-components';

const kuceFight = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
`

const Image = styled.img`
  display: block;
  width: 50%;
  height: auto;
  max-width: 350px;
  max-height: 370px;
  margin: 0 0 36px 0;
  animation: ${kuceFight} 0.3s ease-in-out infinite;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    margin: 0 0 48px 0;
  }
`;

export default Image;