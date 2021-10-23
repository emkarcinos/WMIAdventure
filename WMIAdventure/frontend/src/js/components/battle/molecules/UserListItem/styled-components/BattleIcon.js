import styled from 'styled-components';

const BattleIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  mix-blend-mode: ${({access}) => access ? 'normal' : 'luminosity'};
`;

export default BattleIcon;