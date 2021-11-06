import styled from 'styled-components';

const Label = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.darkGray};
`;

export default Label;