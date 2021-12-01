import styled from 'styled-components';
import kLetter from '../../../../../../assets/icons/k-letter.svg';

const placeholderHandler = (access, avatar) => {
    if (!avatar)
        return access ? 'block' : 'none';
    return 'none';
}

const bgHandler = (theme, access, avatar) => {
    if (!avatar)
        return access ? theme.colors.greenyBluey : theme.colors.lightGray;
    return '';
}

const AvatarContainer = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({theme, access, avatar}) => bgHandler(theme, access, avatar)};
  border-radius: 50%;
  position: relative;
  margin-right: 10px;
  opacity: ${({access}) => access ? '100%' : '50%'};

  &:after {
    display: ${({access, avatar}) => placeholderHandler(access, avatar)};
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 14px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${kLetter});
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 44px;
    height: 44px;

    &:after {
      display: ${({access, avatar}) => placeholderHandler(access, avatar)};
      content: '';
      position: absolute;
      top: 12px;
      left: 13px;
      width: 18px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url(${kLetter});
    }
  }
`;

export default AvatarContainer;