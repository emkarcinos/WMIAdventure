import styled from 'styled-components';

const Container = styled.div`
  border-top-left-radius: ${({user}) => user ? '16px' : '0'};
  border-top-right-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  background-color: ${({theme}) => theme.colors.light2};
  width: 54px;
  height: 64px;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export default Container;