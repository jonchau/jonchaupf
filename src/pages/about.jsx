import React, { Component } from "react";
import { Context } from "../context";
import PageTitle from "../components/pagetitle";
import styled from "styled-components";
import { device } from "../components/device";

export default class about extends Component {
    static contextType = Context;

    render() {
        let { intro } = this.context;

        return (
            <Container>
                <PageTitle title={"ABOUT"}></PageTitle>
                <IntroCard>
                    <MyPicture
                        src={process.env.PUBLIC_URL + "/images/selfpicture.jpg"}
                    ></MyPicture>
                    <Intro>{intro}</Intro>
                </IntroCard>
                <ResumeContainer>
                    <Resume
                        src={process.env.PUBLIC_URL + "/images/resume.jpg"}
                    ></Resume>
                </ResumeContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    min-height: 700px;
    padding-top: 130px;
    box-sizing: border-box;

    @media ${device.tablet} {
        height: 100vh;
        min-height: 800px;
        margin: auto;
        position: relative;
        max-width: 1200px;
    }
`;

const IntroCard = styled.div`
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);
    width: 80%;
    margin: auto;
    padding: 50px;
    box-sizing: border-box;
`;

const MyPicture = styled.img`
    height: 100px;
    width: 100px;
    display: inline-block;
`;

const Intro = styled.div`
    display: inline-block;
`;

const ResumeContainer = styled.div`
    width: 80%;
    margin: 50px auto 0 auto;
    padding-bottom: 40px;

    @media ${device.tablet} {
        padding-bottom: 130px;
    }
`;

const Resume = styled.img`
    width: 100%;
`;
