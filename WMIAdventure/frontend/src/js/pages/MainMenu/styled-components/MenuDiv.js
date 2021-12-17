import styled from 'styled-components';
import frameTop from '../../../../assets/images/mobile-menu-frame-top.svg';
import frameBottom from '../../../../assets/images/mobile-menu-frame-bottom.svg';


const MenuDiv = styled.div`
  width: 100%;
  max-width: 348px;
  height: 628px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after, &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 72%;
    background-repeat: no-repeat;
  }

  &:after {
    top: 0;
    left: 0;
    background-image: url(${frameTop});
  }

  &:before {
    bottom: 0;
    right: 0;
    background-image: url(${frameBottom});
  }
`;

export default MenuDiv;