import styled from 'styled-components';

const Li = styled.li`
  padding: 12px 10px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.4s ease-in-out;
  
  :hover {
    background-color: #E0E0E0;
  }
`;

export default Li;