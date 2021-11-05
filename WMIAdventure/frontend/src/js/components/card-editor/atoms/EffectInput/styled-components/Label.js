import styled from 'styled-components';

const Label = styled.label`
  font-size: 18px;
  font-weight: 200;
  color: ${({theme}) => theme.colors.dark};
  margin-right: ${({marginRight}) => marginRight ? '20px' : 0};
  border-radius: 8px;
  padding: 2px 4px;
  border: ${({checked, theme}) => checked ? `1px solid ${theme.colors.dark}` : '1px solid transparent'}
`;

export default Label;