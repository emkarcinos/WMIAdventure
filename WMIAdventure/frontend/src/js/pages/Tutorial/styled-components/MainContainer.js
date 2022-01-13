import styled from 'styled-components';
import logo from '../../../../assets/icons/logo.svg';

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 56px);
  overflow: hidden;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 80%;
  background-image: url(${logo});
`;

export default MainContainer;