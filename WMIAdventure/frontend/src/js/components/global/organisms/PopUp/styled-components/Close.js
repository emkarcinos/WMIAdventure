import styled from 'styled-components';
import closeIcon from '../../../../../../assets/icons/x-close-black.svg';

const Close = styled.button`
  display: ${({visible}) => visible ? 'block' : 'none'};
  position: absolute;
  border: none;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${closeIcon});
  cursor: pointer;

  width: 12px;
  height: 12px;
  top: 12px;
  right: 12px;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }


  @media (min-width: 360px) {
    width: 16px;
    height: 16px;
    top: 16px;
    right: 16px;
  }
`;

export default Close;