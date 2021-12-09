import styled from 'styled-components';
import closeIcon from '../../../../../../assets/icons/x-close-black.svg';

const Close = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${closeIcon});
  cursor: pointer;

  width: 14px;
  height: 14px;
  top: 16px;
  right: 16px;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default Close;