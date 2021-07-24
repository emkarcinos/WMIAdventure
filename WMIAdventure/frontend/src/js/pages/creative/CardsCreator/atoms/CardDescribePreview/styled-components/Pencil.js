import styled from 'styled-components';
import pensil from '../../../../../../../assets/icons/pencil.svg';

const Pencil = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${pensil});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  opacity: ${
    ({invisible}) => invisible ? "0" : "1"
  };
`;

export default Pencil;