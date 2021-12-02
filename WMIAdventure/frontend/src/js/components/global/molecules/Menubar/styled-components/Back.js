import styled from 'styled-components';
import back from '../../../../../../assets/icons/x-close-black.svg'

const Back = styled.button`
  border: none;
  background-image: url(${back});
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: center;
  background-color: transparent;
  width: 24px;
  height: 24px;
  font-size: 16px;
  cursor: pointer;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    padding: 12px 24px;
  }
`;

export default Back;