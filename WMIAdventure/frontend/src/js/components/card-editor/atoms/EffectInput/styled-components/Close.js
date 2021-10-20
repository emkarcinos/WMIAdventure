import styled from 'styled-components';
import closeX from '../../../../../../assets/icons/x-close-black.svg'


const Close = styled.button`
  position: absolute;
  top: 4px;
  right: 12px;
  display: block;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  background-image: url(${closeX});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;
  background-color: transparent;
`;

export default Close;