import styled from 'styled-components';
import back from '../../../../../../assets/icons/cross-big.svg'

const Back = styled.button`
  border: none;
  background-image: url(${back});
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: right;
  background-color: transparent;
  width: 95%;
  height: 24px;
  font-size: 16px;
  cursor: pointer;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    padding: 12px 24px;
  }

  transition: transform 0.05s ease-in-out;

  &:hover {
    transform: scale(1.1) translateX(-14px);
  }
`;

export default Back;