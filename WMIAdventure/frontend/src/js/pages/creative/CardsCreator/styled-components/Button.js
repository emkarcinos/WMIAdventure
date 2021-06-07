import styled from 'styled-components';

function showHandler(show) {
    if(show === 'create')
        return 'none';
    else if (show === 'edit' || show === true)
        return 'block';
}

const Button = styled.button`
  display: ${({show}) => showHandler(show)};
  background-color: transparent;
  color: ${({theme}) => theme.colors.ui01};
  border: 2px solid ${({theme}) => theme.colors.ui01};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  padding: 12px;
  margin: 0 12px;
  cursor: pointer;
`;

export default Button;