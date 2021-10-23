import styled from 'styled-components';
import closeX from '../../../../../../assets/icons/x-close-black.svg';

const Close = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 16px;
  right: 16px;
  background-color: transparent;
  background-image: url(${closeX});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 16px;
  height: 16px;
  z-index: 5;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 24px;
    height: 24px;
    top: 20px;
    right: 20px;
  }
`;

export default Close;