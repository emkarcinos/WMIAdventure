import styled from 'styled-components';

const IconContainer = styled.div`
  width: 100%;
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.light2};
  margin: ${({borderDown}) => borderDown ? '0 0 10px 0' : '10px 0 0 0'};
`;

export default IconContainer;