import styled from 'styled-components';

const Category = styled.p`
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.regular};
  text-transform: uppercase;
  margin: 0;
`;

export default Category;