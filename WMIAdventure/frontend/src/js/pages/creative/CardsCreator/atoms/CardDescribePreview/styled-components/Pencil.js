import styled from 'styled-components';
import pensil from '../../../../../../../assets/icons/pencil.svg';

const Pencil = styled.div`
  width: 70px;
  height: 70px;
  background-image: url(${pensil});
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  opacity: ${
    ({invisible}) => invisible ? "0" : "1"
  };
`;

export default Pencil;