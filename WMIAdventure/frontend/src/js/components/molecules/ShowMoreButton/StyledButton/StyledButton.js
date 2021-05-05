import styled from 'styled-components';
import Icon from './Icon';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${({theme}) => theme.colors.ui01};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  outline-color: ${({theme}) => theme.colors.brand01};
  padding: 0;
  margin: 0 36px 0 0;
`;

StyledButton.Icon = Icon;

export default StyledButton;