import styled from 'styled-components';

const BattleImage = styled.img`
  width: 160px;
  height: 168px;
  margin-bottom: 26px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 260px;
    height: 300px;
    margin: 16px 12px 0 0;
  }
`;

export default BattleImage;