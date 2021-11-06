import styled from 'styled-components';

const Ul = styled.ul`
  width: 100%;
  max-width: 340px;
  overflow-y: scroll;
  list-style: none;
  margin: 0 auto 92px;
  padding: 0 10px 10px;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  scrollbar-width: ${({scrollVisible}) => scrollVisible ? 'thin' : 'none'};
  -ms-overflow-style: ${({scrollVisible}) => scrollVisible ? 'auto' : 'none'}; /* IE 10+ */
  ::-webkit-scrollbar {
    display: ${({scrollVisible}) => scrollVisible ? 'auto' : 'none'}; /* Chrome Safari */
  }
  
  @media(min-width: ${({theme}) => theme.overMobile}px) {
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    
    max-width: 514px;
    height: 100%;
    margin: 0;
  }
`;

export default Ul;