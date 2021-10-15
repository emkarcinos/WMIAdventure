import styled from 'styled-components';
import kLetter from '../../../../../../../assets/icons/k-letter.svg';

const AvatarContainer = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({theme}) => theme.colors.uiGreen};
  border-radius: 50%;
  position: relative;
  margin-right: 10px;
  
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    display: block;
    width: 14px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${kLetter});
  }
`;

export default AvatarContainer;