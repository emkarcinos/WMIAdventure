import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Link)`
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  border: 2px solid ${({theme}) => theme.colors.gold};
  height: 72px;
  width: 120px;
  background-color: ${({theme}) => theme.colors.ui05};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.ui06};
  text-decoration: none;
  margin: 0 6px 16px 6px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    border: 7px solid ${({theme}) => theme.colors.gold};
    height: 124px;
    width: 336px;
  }
`;

export default Wrapper;