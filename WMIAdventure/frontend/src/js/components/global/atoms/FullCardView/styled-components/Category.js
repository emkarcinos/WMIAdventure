import styled from 'styled-components';

const Category = styled.p`
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.regular};
  text-transform: uppercase;
  margin: 0;
  color: ${({theme}) => theme.colors.dark};
  text-align: center;
  overflow-wrap: anywhere;
  max-width: 200px;
`;

export default Category;