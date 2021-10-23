import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.ui01};
  padding: 0 10px;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    max-width: 514px;
  }
`;

export default SearchContainer;