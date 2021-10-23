import styled from 'styled-components';
import Button from './Button';
import backIcon from '../../../../../../assets/icons/back.svg';

const Back = styled(Button)`
  background-image: url(${backIcon});
  width: 10px;
  height: 16px;
  margin-left: 24px;
`;

export default Back;