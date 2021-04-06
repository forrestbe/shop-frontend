import styled from 'styled-components';

const CartStyles = styled.div`
  --side-padding: 20px;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    padding-left: var(--side-padding);
    border-bottom: 1px solid var(--black);
    
    button {
      height: var(--header-height);
      width: var(--header-height);
      background-color: transparent;
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-left: 1px solid var(--black);
      font-size: 2rem;
    }
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    padding-right: var(--side-padding);
    padding-left: var(--side-padding);
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export default CartStyles;
