import styled from 'styled-components';
import elemBefore from '../../../../../../assets/images/battleLeftBackground.png';
import elemAfter from '../../../../../../assets/images/battleRightBackground.png';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    max-width: 1092px;
    max-height: 954px;
    height: calc(100% - 12px);
    position: relative;

    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      width: 188px;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: transform 0.5s ease-in-out;
    }

    &:before {
      left: 0;
      background-image: url(${elemBefore});
      transform: translateX(${({setBeforeTranslateX}) => setBeforeTranslateX ? setBeforeTranslateX : '0'});
    }

    &:after {
      right: 0;
      background-image: url(${elemAfter});
      transform: translateX(${({setAfterTranslateY}) => setAfterTranslateY ? setAfterTranslateY : '0'});
    }
  }
`;

export default MainContainer;