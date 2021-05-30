import styled from 'styled-components';
import Header from './Header';
import Image from './Image';
import Paragraph from './Paragraph';

const StyledAvatar = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

StyledAvatar.Header = Header;
StyledAvatar.Image = Image;
StyledAvatar.Paragraph = Paragraph;

export default StyledAvatar;