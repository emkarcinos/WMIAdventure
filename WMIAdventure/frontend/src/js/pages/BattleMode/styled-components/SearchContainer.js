import styled from 'styled-components';

const SearchContainer = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.ui01};
  padding: 0 10px;
`;

export default SearchContainer;