import styled from 'styled-components';
import Button from "./Button";
import backIcon from '../../../../../../assets/icons/back.svg';

const Back = styled(Button)`
  background-image: url(${backIcon});
  width: 24px;
  height: 24px;
`;

export default Back;