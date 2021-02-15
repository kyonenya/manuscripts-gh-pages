import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { articlable } from './types';

export const HeaderMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
  isSubmitting: boolean,
}) => {
  return (
    <nav>
      <HorizontalList>
        <li style="margin-right: auto;">
          <Date>
            {props.createdAt}
          </Date>
        </li>
        <li><Button>❤️</Button></li>
        <li><Button>🔖</Button></li>
        <li>
          <Button onClick={props.handleSubmit}>
            { props.isSubmitting ? '⏳' : '✅'}
          </Button>
        </li>
      </HorizontalList>
    </nav>
  );
};

const HorizontalList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center /* vertical */;
  list-style-type: none;
  padding: 0px;
`;
const Button = styled.div`
  display: block;
  width: 2.5em;
  text-align: center;
`;
const Date = styled.div`
  width: 9em;
  color: gray;
`;
