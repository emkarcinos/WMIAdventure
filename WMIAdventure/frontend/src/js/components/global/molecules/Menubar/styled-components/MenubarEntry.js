import styled from 'styled-components';
import Button from './Button';

const MenubarEntry = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  font-size: 24px;
  height: 38px;
  padding: 10px 0;
  margin-left: 10px;

  &:before {
    display: block;
    position: relative;
    content: '';
    background-image: ${({image}) => `url(${image})`};
    background-size: 28px 28px;
    width: 28px;
    height: 28px;
  }
`

export default MenubarEntry;