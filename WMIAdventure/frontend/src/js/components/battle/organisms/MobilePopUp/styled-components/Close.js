import styled from 'styled-components';
import closeIcon from '../../../../../../assets/icons/x-close-black.svg';

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${closeIcon});
  cursor: pointer;
`;

export default Close;