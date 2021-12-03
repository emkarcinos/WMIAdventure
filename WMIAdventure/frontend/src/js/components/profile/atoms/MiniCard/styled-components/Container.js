import styled from 'styled-components';

const Container = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  background-color: ${({theme}) => theme.colors.light2};
  width: 54px;
  height: 64px;
  padding: ${({borderDown}) => borderDown ? '0 0 10px 0' : '10px 0 0 0'};
  border-radius: ${({borderDown}) => borderDown ? '0 0 16px 16px' : '16px 16px 0 0'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default Container;