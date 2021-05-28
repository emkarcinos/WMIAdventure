import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Decorate from './Decorate';
import Paragraph from './Paragraph';
import Label from './Label';
import Time from './Time';

const StyledLink = styled(Link)`
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  border: 7px solid ${({theme}) => theme.colors.gold};
  height: 124px;
  width: 336px;
  background-color: ${({theme}) => theme.colors.ui05};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.ui06};
  text-decoration: none;
  margin: 0 6px;
`;

StyledLink.Decorate = Decorate;
StyledLink.Paragraph = Paragraph;
StyledLink.Label = Label;
StyledLink.Time = Time;

export default StyledLink;