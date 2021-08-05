import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../components/device";
import { withRouter } from "react-router-dom";

class pagetitle extends Component {
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
        //console.log(window.scrollY);
        return (
            <Container>
                <Title opacity={this.state.hideTitle ? "0" : "1"}>
                    {this.props.location.pathname.match(
                        "/([A-Za-z0-9]*)"
                    )[0] !== "/"
                        ? this.props.location.pathname
                              .match("/([A-Za-z0-9]*)")[1]
                              .toUpperCase()
                        : "HOME"}
                </Title>
            </Container>
        );
    }
}

export default withRouter(pagetitle);

const Container = styled.div`
    z-index: 45;
    position: fixed;
    top: 32px;
    left: 20px;
    letter-spacing: 0.1rem;
    //width: 130px + width of scrollbar - 2
    width: 135px;

    @media ${device.tablet} {
        left: auto;
        top: 40px;
        right: 0;
    }
`;
const Title = styled.div`
    font-size: 0.8rem;
    text-align: left;

    @media ${device.tablet} {
        font-size: 0.9rem;
        text-align: center;
        transition: 0.4s all;
        opacity: ${(props) => props.opacity};
    }
`;
