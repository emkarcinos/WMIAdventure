import styled from 'styled-components';
import frameTop from '../../../../../../assets/images/mobile-menu-frame-top.svg';
import frameBottom from '../../../../../../assets/images/mobile-menu-frame-bottom.svg';
import frameLeft from '../../../../../../assets/images/desktop-menu-frame-left.svg';
import frameRight from '../../../../../../assets/images/desktop-menu-frame-right.svg';

const Container = styled.div`
  width: 100%;
  max-width: 348px;
  height: 628px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-right: 8px;

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
    bottom: 10px;
    right: 0;
    background-image: url(${frameBottom});
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1312px) {
    &:after, &:before {
      display: none;
    }
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    max-width: none;
    width: 1250px;
    height: 670px;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 0;

    &:after, &:before {
      width: 880px;
      height: 660px;
    }

    &:after {
      background-image: url(${frameLeft});
      top: 0;
      left: 26px;
      bottom: auto;
    }

    &:before {
      background-image: url(${frameRight});
      top: 0;
      right: 26px;
    }
  }
`;

export default Container;