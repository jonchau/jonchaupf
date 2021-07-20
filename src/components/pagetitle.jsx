import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../components/device";

export default class pagetitle extends Component {
    state = { hideTitle: false };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 0) {
            this.setState({ hideTitle: true });
        } else {
            this.setState({ hideTitle: false });
        }
    };

    render() {
        return (
            <Container>
                <Title opacity={this.state.hideTitle ? "0" : "1"}>
                    {this.props.title}
                </Title>
            </Container>
        );
    }
}

const Container = styled.div`
    z-index: 45;
    position: fixed;
    top: 32px;
    left: 20px;
    letter-spacing: 0.1rem;
    width: 100px;

    @media ${device.tablet} {
        left: auto;
        top: 40px;
        right: 40px;
    }
`;
const Title = styled.div`
    font-size: 0.9rem;

    @media ${device.tablet} {
        transition: 0.4s all;
        opacity: ${(props) => props.opacity};
    }
`;
