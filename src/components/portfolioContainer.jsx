import React, { Component, useState } from "react";
import { Context } from "../context";
import styled from "styled-components";
import { device, sizeNumber } from "../components/device";
import Display from "../components/display";
import Loading from "../components/loading";
import PointerSvg from "../components/pointersvg";
import { useSpring, animated, config } from "react-spring";

const AnimatedButtonsContainer = (props) => {
    const { underline } = props;

    const styledProps = useSpring({
        to: {
            transform: underline ? "scale(1)" : "scale(0)",
            backdropFilter: underline ? " blur(8px)" : "blur(0px)",
            opacity: underline ? "1" : "0",
        },
        config: config.stiff,
    });

    return (
        <ButtonsContainer style={styledProps}>{props.buttons}</ButtonsContainer>
    );
};

const AnimatedButtonsUnderline = (props) => {
    const { underline } = props;

    const styledProps = useSpring({
        to: {
            width: underline ? "211px" : "26px",
            backgroundColor: underline
                ? "rgba(99, 255, 239, 0.5)"
                : "rgba(100, 100, 100, 1)",
            boxShadow: underline
                ? "0px 0px 5px rgba(99, 255, 239, 1)"
                : "0px 0px 5px rgba(255,255,255,0)",
        },
        config: config.gentle,
    });

    return (
        <ButtonsContainerUnderline
            style={styledProps}
        ></ButtonsContainerUnderline>
    );
};

const AnimatedButton = (props) => {
    const { tablet } = props;

    const [glow, setGlow] = useState(0);

    return (
        <div onMouseEnter={() => setGlow(1)} onMouseLeave={() => setGlow(0)}>
            <Button
                key={props.project.id}
                onClick={() => props.openFunctionCallback(props.project.id)}
            >
                {props.project.name.length > 20
                    ? props.project.name.substring(0, 20 - 3) + "..."
                    : props.project.name}

                <PointerSvg
                    hovered={glow}
                    tablet={tablet}
                    scaleAfter={"scale(0.65)"}
                    scaleBefore={"scale(0)"}
                    fillAfter={"rgba(99, 255, 239, 0.5)"}
                    fillBefore={"rgba(99, 255, 239, 0)"}
                    location={"left:-35px; top: 0;"}
                    position={"absolute"}
                ></PointerSvg>
            </Button>
        </div>
    );
};

export default class portfolioContainer extends Component {
    static contextType = Context;

    state = {
        project: {},
        selectedProject: "",
        tablet: false,
        underline: false,
        isOpen: false,
    };

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.tablet !== prevState.tablet && !this.state.tablet) {
            window.location.reload();
        }
    }

    resize = () => {
        if (window.innerWidth < sizeNumber.tablet) {
            return this.setState({ tablet: true });
        }
        return this.setState({ tablet: false });
    };

    getProject = (project) => {
        this.setState({ project: project }, () => {});
    };

    open = (project) => {
        this.setState({ selectedProject: project }, () => {
            this.getProject(project);
        });
    };

    closeProject = () => {
        this.setState({ project: {}, selectedProject: "", underline: true });
    };

    closeUnderline = () => {
        this.setState({ underline: false });
    };

    toggleMobilebuttons = () => {
        this.setState({ isOpen: !this.state.isOpen }, () => {});
    };

    render() {
        let { projects } = this.context;

        if (projects.length === 0) {
            return (
                <Container>
                    <LoadingContainer>
                        <Loading scale={"1"} speed={2}></Loading>
                    </LoadingContainer>
                </Container>
            );
        }

        const buttonProps = projects.map((project) => {
            return (
                <div
                    key={project.id}
                    onClick={
                        this.state.tablet
                            ? () => this.toggleMobilebuttons()
                            : null
                    }
                >
                    <AnimatedButton
                        project={project}
                        selected={this.state.selectedProject}
                        openFunctionCallback={this.open}
                        tablet={this.state.tablet}
                    ></AnimatedButton>
                </div>
            );
        });

        const displayProjects = projects.map((project) => {
            return (
                <Display
                    key={project.id}
                    project={project}
                    open={this.state.project}
                ></Display>
            );
        });

        return (
            <Container>
                <ProjectButtonsContainer
                    onMouseEnter={() => this.closeProject()}
                    onMouseLeave={() => this.closeUnderline()}
                >
                    <AnimatedButtonsContainer
                        buttons={buttonProps}
                        underline={this.state.underline}
                    ></AnimatedButtonsContainer>
                    <ProjectButtonIcon
                        src={
                            process.env.PUBLIC_URL + "/images/projectsicon.png"
                        }
                    ></ProjectButtonIcon>
                    <AnimatedButtonsUnderline
                        underline={this.state.underline}
                    ></AnimatedButtonsUnderline>
                    <Title>PROJECTS</Title>
                </ProjectButtonsContainer>

                <MobileButtonsContainer
                    isOpen={
                        this.state.isOpen
                            ? `height: ${projects.length * 80}px`
                            : "height: 0px"
                    }
                >
                    <MobileButtons>{buttonProps}</MobileButtons>
                </MobileButtonsContainer>

                <ToggleContainer>
                    <ToggleMobileButtons
                        src={
                            process.env.PUBLIC_URL + "/images/projectsicon.png"
                        }
                        onClick={() => this.toggleMobilebuttons()}
                    ></ToggleMobileButtons>
                    <Title isOpen={this.state.isOpen ? "1" : "0"}>
                        PROJECTS
                    </Title>
                    <MobileUnderline
                        isOpen={
                            this.state.isOpen
                                ? "background-color:rgba(99, 255, 239, 0.5); width: calc(100% - 40px); box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);"
                                : "width: 33px;"
                        }
                    ></MobileUnderline>
                </ToggleContainer>
                <DisplayContainer>{displayProjects}</DisplayContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    overflow: hidden;
    height: 100vh;
    padding: 80px 0 20px 0;
    box-sizing: border-box;

    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: auto;

    @media ${device.tablet} {
        min-height: 900px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const ProjectButtonIcon = styled.img`
    position: absolute;
    top: 33px;
    left: 26px;
    height: 26px;

    transform-origin: left;
    transition: 0.4s all;
    transform: scale(1);
`;

const Title = styled.div`
    font-size: 0.7rem;
    letter-spacing: 0.1rem;

    position: absolute;
    transition: 0.3s all;

    top: 37px;
    left: 70px;
    opacity: ${(props) => props.isOpen};

    @media ${device.tablet} {
        top: 42px;
        left: 75px;
        opacity: 0;
    }
`;

const ProjectButtonsContainer = styled.div`
    display: none;

    @media ${device.tablet} {
        display: block;
        top: 0;
        left: 20px;
        position: absolute;

        width: 100px;
        height: 90px;
        z-index: 2;

        &:hover ${ProjectButtonIcon} {
            transform: scale(1.2);
        }

        &:hover ${Title} {
            opacity: 1;
        }
    }
`;

const ButtonsContainer = styled(animated.div)`
    position: absolute;
    top: 65px;
    left: 26px;

    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.07);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.4);

    transform-origin: 20% 0%;
`;

const Button = styled(animated.div)`
    text-align: center;
    position: relative;
    cursor: pointer;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.tablet} {
        height: auto;
        display: block;
        padding: 15px 10px;
        width: 170px;
        margin: 10px;
    }
`;

const ButtonsContainerUnderline = styled(animated.div)`
    background-color: rgb(100, 100, 100);
    position: absolute;
    bottom: 24px;
    left: 26px;
    height: 1px;
`;

const DisplayContainer = styled.div`
    /*   box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px); */

    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2;

    z-index: 1;
    position: relative;

    height: 100%;

    margin: 0 20px;
    box-sizing: border-box;

    @media ${device.tablet} {
        width: 80%;
        max-width: 1000px;
        height: 600px;
    }
`;

const LoadingContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const MobileButtonsContainer = styled.div`
    overflow: hidden;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    transition: 0.5s all;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);

    margin: 0 20px 15px 20px;
    box-sizing: border-box;

    ${(props) => props.isOpen};

    @media ${device.tablet} {
        display: none;
    }
`;
const MobileButtons = styled.div`
    height: 80px;
    width: 100%;
`;

const ToggleContainer = styled.div`
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    position: relative;

    @media ${device.tablet} {
        display: none;
    }
`;

const ToggleMobileButtons = styled.img`
    height: 33px;
    padding: 25px 10px 1px 20px;

    @media ${device.tablet} {
        display: none;
    }
`;

const MobileUnderline = styled.div`
    height: 1px;
    background-color: black;
    margin: 0 20px;
    transition: 0.3s all;

    //width is calc(100% - 2x margins)
    ${(props) => props.isOpen};
`;
