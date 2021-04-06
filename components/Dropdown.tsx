import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
}

const DropDownMenuStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  button {
    white-space: nowrap;
    
    &:active,
    &:focus {
      outline: none;
    }
  }
  ul {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9999;
    border: 1px solid rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    padding-right: 1rem;
    padding-left: 1rem;
    list-style: none;
    font-size: 1.4rem;
  }
`;

export function DropDown({ title, children }: DropdownProps): JSX.Element {
  const node: MutableRefObject<HTMLDivElement> = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e): void => !(node?.current?.contains(e.target)) ? setShowMenu(false): null;

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <DropDownMenuStyles ref={node}>
      <button onClick={() => setShowMenu(!showMenu)} type="button">{title}</button>
      { showMenu &&
        <ul>
          {children}
        </ul>
      }
    </DropDownMenuStyles>
  );
}
