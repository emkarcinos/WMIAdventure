import styled from 'styled-components';

const PageButton = styled.button`
  /* Flex options */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Sizing */
  width: 32px;
  height: 32px;
  
  /* Styling */
  background: ${({theme, disabled}) => !disabled ? theme.colors.ui02 : theme.colors.ui05};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-style: none;
  cursor: ${({disabled}) => disabled ? 'auto' : 'pointer'} ;

  /* Font */
  color: ${({theme, disabled}) => !disabled ? theme.colors.text01 : theme.colors.grey1};
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
`;

export default PageButton;