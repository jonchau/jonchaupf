import React, { Component } from "react";
import styled from "styled-components";
import { device } from "../components/device";
import PortfolioContainer from "../components/portfolioContainer";
import PageTitle from "../components/pagetitle.jsx";

export default class home extends Component {
    render() {
        return (
            <>
                <Container>
                    <PageTitle title={"HOME"}></PageTitle>
                    <PortfolioContainer></PortfolioContainer>
                </Container>
            </>
        );
    }
}

const Container = styled.div`
    width: 100%;

    @media ${device.tablet} {
        // max-width: 1200px;
        //for footer?
        margin: auto;
        min-height: 600px;
    }
`;
