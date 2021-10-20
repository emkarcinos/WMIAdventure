import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${({theme}) => theme.colors.ui01};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  outline-color: ${({theme}) => theme.colors.brand01};
  padding: 0;
  margin: 0 24px 0 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 48px;
    height: 48px;
    margin: 0 52px 0 0;
  }
`;

export default Wrapper;