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

  width: 16px;
  height: 16px;
  top: 16px;
  right: 16px;
`;

export default Close;