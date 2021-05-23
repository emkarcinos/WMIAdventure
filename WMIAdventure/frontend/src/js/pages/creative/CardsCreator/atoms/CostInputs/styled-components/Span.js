import styled from 'styled-components';
import levelCostIcon from '../../../../../../../assets/icons/level-cost.svg';

const Span = styled.span`
  position: relative;
  :before {
    content: '';
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    top: 5px;
    left: 4px;
    background-image: url(${levelCostIcon});
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
  }
`;

export default Span;