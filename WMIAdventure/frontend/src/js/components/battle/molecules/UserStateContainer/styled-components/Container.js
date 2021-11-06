import styled from 'styled-components';

const Container = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({theme}) => theme.colors.light2};
  min-width: 226px;
  height: 136px;
  width: 60%;
  max-width: 380px;
`;

export default Container;