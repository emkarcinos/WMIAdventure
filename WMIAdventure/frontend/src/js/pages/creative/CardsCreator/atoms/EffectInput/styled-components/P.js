import styled from 'styled-components';
import radioLineIcon from '../../../../../../../assets/icons/radio-line.svg'

const P = styled.p`
  display: block;
  margin: 0;
  position: relative;
  
  :after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    left: 58px;
    width: 12px;
    height: 24px;
    background-image: ${({radioLine}) => radioLine ? `url(${radioLineIcon})` : 'none'};
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default P;