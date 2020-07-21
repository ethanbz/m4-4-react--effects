import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ item, counter, handleClick, index }) => {
    const ref = useRef(null)

    useEffect(() => {
        if (index===0) ref.current.focus()
    }, [])
    return (
        <Wrapper onClick={handleClick} ref={ref}>
            <div>
                <h4 style={{fontSize: 22}}>{item.name}</h4>
                <p>Cost: {item.cost} cookies. Produces {item.value} cookies/{item.id === 'megacursor' ? 'click' : 'second'}.</p>
            </div>
            <Counter>{counter}</Counter>
        </Wrapper>

    )
}

const Wrapper = styled.button`
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    background: none;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid gray;
    padding: 15px 0px;
    justify-content: space-between;
    text-align: left;
`

const Counter = styled.div`
    font-size: 40px;
    margin-left: 20px;

`
export default Item