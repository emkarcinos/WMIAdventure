import styled from 'styled-components';

const Name = styled.p`
  color: ${
      ({disabled, theme}) => disabled ? theme.colors.darkTrans : theme.colors.dark
  };
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  margin: 0 0 6px 0;
  max-width: 280px;
  text-align: start;
  color: ${({theme}) => theme.colors.dark};
`;

export default Name;