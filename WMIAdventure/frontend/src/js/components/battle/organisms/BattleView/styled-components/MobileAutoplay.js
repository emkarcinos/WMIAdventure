import styled from 'styled-components';

const MobileAutoplay = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({theme}) => theme.colors.light2};
  border-radius: 6px;
  border: 2px solid ${({borderColor}) => borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -46px;
  right: 0;
  z-index: 100;
`;

export default MobileAutoplay;