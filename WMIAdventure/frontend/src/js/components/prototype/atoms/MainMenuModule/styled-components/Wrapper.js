import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Link)`
  background-color: ${({theme}) => theme.colors.ui05};
  color: ${({theme}) => theme.colors.ui06};
  width: 100%;
  height: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    flex-direction: row;
    justify-content: space-between;
    height: 152px;
  }
`;

export default Wrapper;