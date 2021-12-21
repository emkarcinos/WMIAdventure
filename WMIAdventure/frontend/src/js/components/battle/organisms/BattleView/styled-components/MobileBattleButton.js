import styled from 'styled-components';

const MobileBattleButton = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({theme}) => theme.colors.light2};
  border-radius: 6px;
  border: 2px solid ${({borderColor}) => borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({setTop}) => setTop ? setTop : '0'};
  right: ${({setRight}) => setRight ? setRight : '0'};
  z-index: 100;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
`;

export default MobileBattleButton;