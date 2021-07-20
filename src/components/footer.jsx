import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../components/device";

export default class footer extends Component {
    render() {
        return (
            <Container>
                <Center>JONCHAU0404@GMAIL.COM</Center>
            </Container>
        );
    }
}
const Container = styled.div`
    //if height is changed, change the padding-bottom in app.js
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(5px);
    display: grid;

    @media ${device.tablet} {
        display: none;
    }
`;

const Center = styled.div`
    margin: auto;
    letter-spacing: 0.05rem;
    font-size: 0.85rem;
`;
