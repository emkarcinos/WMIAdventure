import styled from 'styled-components';

const Name = styled.p`
  color: ${
    ({ disabled, theme}) => disabled ? theme.colors.ui07trans : theme.colors.ui07
  };
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0 0 6px 0;
  max-width: 280px;
  text-align: start;
  color: ${({theme}) => theme.colors.borderLine};
`;

export default Name;