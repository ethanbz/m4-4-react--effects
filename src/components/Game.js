import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from './Item'
import { useInterval, useKeydown, useDocumentTitle } from '../hooks/use-interval.hook'

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: 'megacursor', name: 'MegaCursor', cost: 500, value: 50 }
];


const Game = () => {
  const [numCookies, setNumCookies] = useState(100)
  const [counter, setCounter] = useState([0, 0, 0, 0])
  const ref = useRef(null);

  const handleClick = (item) => {
    if (item === null || item.code === 'Space') {
      if (item !== null && item.repeat) {return}
      counter[3] === 0 ? setNumCookies(numCookies+1) : setNumCookies(numCookies + counter[3]*items[3].value)
    } else if (numCookies >= item.cost) {
      setCounter(counter.map((count, index) => index === items.indexOf(item) ? count+1 : count))
      setNumCookies(numCookies-item.cost)
      item.cost = Math.round(item.cost*1.2);
    }
  }

  const calculateCookiesPerTick = () => {
    return counter.map((count, index) => {
      if (index === 0) return count
      if (index === 1) return count*10
      if (index === 2) return count*80
      if (index === 3) return count*0
    }).reduce((total, count) => total+count)
  }

  useDocumentTitle(`${numCookies} cookies - Cooker Clicker Workshop`, 'Cookie Clicker Workshop')

  useKeydown(handleClick)

  useInterval(() => {
    setNumCookies(numCookies + calculateCookiesPerTick())
  }, 1000)

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick()}</strong> cookies per second ||
          <strong> {counter[3]*items[3].value || 1}</strong> cookies per click
        </Indicator>
        <Button id='cookie'ref={ref} onClick={() => handleClick(null)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => <Item item={item} counter={counter[items.indexOf(item)]} 
          handleClick={() => handleClick(item)} index={index} key={item.id} />)}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  &:active {
    transform: scale(1.2)
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 450px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
