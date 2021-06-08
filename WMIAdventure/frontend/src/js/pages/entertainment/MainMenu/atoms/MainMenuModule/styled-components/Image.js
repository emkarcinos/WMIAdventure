import styled from 'styled-components';

const Image = styled.img`
  display: none;
  
  @media(min-width: 768px) {
    display: block;
    width: 414px;
    height: 152px;
    margin-right: 80px;
  }
`;

export default Image;