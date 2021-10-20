import styled from 'styled-components';
import searchIcon from '../../../../../../assets/icons/search.svg';

const P = styled.p`
  margin: 0;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.colors.borderLine};
  position: relative;
  
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 16px;
    left: 12px;
    width: 16px;
    height: 16px;
    background-image: url(${searchIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export default P;