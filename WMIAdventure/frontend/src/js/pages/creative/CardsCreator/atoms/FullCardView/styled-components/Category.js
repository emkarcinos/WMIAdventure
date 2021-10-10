import styled from 'styled-components';

const Category = styled.p`
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.regular};
  text-transform: uppercase;
  margin: 0;
  color: ${({theme}) => theme.colors.borderLine};
  text-align: center;
  overflow-wrap: anywhere;
  max-width: 156px;
`;

export default Category;