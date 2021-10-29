import styled, {css, keyframes} from 'styled-components';

const kuceFight = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
`

const kuceAnimation = () =>
    css`
      ${kuceFight} 0.3s  ease-in-out infinite
    `;

const KuceBattleImage = styled.img`
  width: auto;
  height: 70%;
  max-height: 474px;
  margin: 18px 0;
  order: 2;
  
  animation: ${({fight}) => fight ? kuceAnimation : 'none'};
`;

export default KuceBattleImage;