import styled from 'styled-components';

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.light2};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 40px;
  margin: ${({last}) => last ? '0' : '0 0 20px 0'};
`;

export default Li;