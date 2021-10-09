import styled from 'styled-components';

const MobileLevelsMenu = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: ${({theme}) => theme.colors.grey1};
`;

export default MobileLevelsMenu;