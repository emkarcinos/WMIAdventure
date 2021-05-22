import styled from 'styled-components';
import closeX from '../../../../../../assets/icons/x-close.svg';

const Close = styled.button`
  display: ${({show}) => show ? 'block' : 'none'};
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 14px;
  right: 8px;
  background-color: transparent;
  background-image: url(${closeX});
  background-position: center;
  background-repeat: no-repeat;
  width: 10px;
  height: 10px;
`;

export default Close;