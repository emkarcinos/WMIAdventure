import styled from 'styled-components';

function dotColor(rank) {
    if(rank === 1)
        return '#56CCF2';
    if(rank === 2)
        return '#F2C94C';
    if(rank === 3)
        return '#BB6BD9';
}

const Button = styled.button`
  font-size: 18px;
  font-weight: 300;
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  width: 100%;
  text-align: center;
  
  :before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 30%;
    border-radius: 50%;
    background-color: ${({rank}) => dotColor(rank)};
  }
`;

export default Button;