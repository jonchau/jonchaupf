import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device, sizeNumber } from "../components/device";
import AnimatedSvg from "../components/svglines";
import {
    useSpring,
    useChain,
    animated,
    useSpringRef,
    config,
} from "react-spring";

const AnimatedDetailsContainer = (props) => {
    const { open, tablet } = props;

    const styleProps = useSpring({
        to: async (props) => {
            if (!tablet) {
                await props({
                    opacity: open ? "1" : "0",
                    transform: open
                        ? "scale(1) translate(10%, 20%)"
                        : "scale(0) translate(10%, 20%)",
                    /*        left: open ? "0%" : "50%",
                    bottom: open ? "0%" : "50%",
                    transform: open
                        ? "translate(10%, 20%)"
                        : "translate(-50%, -50%)", */
                });
            } else {
                await props({
                    opacity: "0",
                    transform: "scale(0) translate(10%, 20%)",
                    /*     top: "0",
                    left: "0",
                    transform: "translate(0, 0)", */
                });
            }
        },

        config: config.stiff,
    });

    return (
        <>
            <DetailsContainer style={styleProps}>
                <AnimatedSvg
                    tablet={tablet}
                    open={open}
                    svgs={{
                        circle1: { cx: "102", cy: "36" },
                        circle2: { cx: "40", cy: "195" },
                        path: { d: "M 100 40 l -60 100 l 0 50" },
                    }}
                    location={"left: -20px; bottom: 10px;"}
                    containerWidth={"150"}
                    containerHeight={"250"}
                    strokeArray={170}
                ></AnimatedSvg>
                <StyledLink to={`/projects/${props.project.id}`}>
                    <Name>Click for more details</Name>
                </StyledLink>
            </DetailsContainer>
        </>
    );
};

const AnimatedDescriptionContainer = (props) => {
    const { open, tablet } = props;

    const description = props.project.description.map((item, index) => {
        return <Description key={index}>{item}</Description>;
    });

    const styleProps = useSpring({
        to: async (props) => {
            if (!tablet) {
                await props({
                    opacity: open ? "1" : "0",
                    transform: open
                        ? "scale(1) translate(-15%, 10%)"
                        : "scale(0) translate(15%, -10%)",
                    /*  bottom: open ? "0%" : "50%",
                    right: open ? "0%" : "50%",
                    transform: open
                        ? "translate(15%, -10%)"
                        : "translate(-50%, -50%)", */
                });
            } else {
                await props({
                    opacity: open ? "1" : "0",
                    transform: "scale(0) translate(15%, -10%)",
                    /*       bottom: "0",
                    left: "0",
                    transform: "translate(0, 0)", */
                });
            }
        },
        config: config.stiff,
    });

    return (
        <>
            <DescriptionContainer style={styleProps}>
                <AnimatedSvg
                    tablet={tablet}
                    open={open}
                    svgs={{
                        circle1: { cx: "75", cy: "45" },
                        circle2: { cx: "216", cy: "95" },
                        path: { d: "M 80 45 L 140, 45  l 40 50 l 70 0" },
                    }}
                    location={"left: -200px; bottom: -30px;"}
                    containerWidth={"300"}
                    containerHeight={"150"}
                    strokeArray={156}
                ></AnimatedSvg>
                <div>{description}</div>
            </DescriptionContainer>
        </>
    );
};

const AnimatedNameContainer = (props) => {
    const { open, tablet } = props;

    const styleProps = useSpring({
        to: async (props) => {
            if (!tablet) {
                await props({
                    opacity: open ? "1" : "0",
                    transform: open
                        ? "scale(1) translate(-10%, -20%)"
                        : "scale(0) translate(-10%, -20%)",
                    /*     top: open ? "0%" : "50%",
                    right: open ? "0%" : "50%",
                    transform: open
                        ? "translate(-10%, -20%)"
                        : "translate(-50%, -50%)", */
                });
            } else {
                await props({
                    opacity: open ? "1" : "0",
                    transform: "scale(0) translate(-10%, -20%)",
                    /*     top: "0",
                    right: "0",
                    transform: "translate(0, 0)", */
                });
            }
        },
        config: config.stiff,
    });

    return (
        <>
            <NameContainer style={styleProps}>
                <AnimatedSvg
                    tablet={tablet}
                    open={open}
                    svgs={{
                        circle1: { cx: "57", cy: "41" },
                        circle2: { cx: "175", cy: "115" },
                        path: { d: "M 60 45  l 50 70 l 60 0" },
                    }}
                    location={"left: 165px; top: 14px;"}
                    containerWidth={"300"}
                    containerHeight={"150"}
                    strokeArray={156}
                ></AnimatedSvg>
                <Name>
                    {props.project.name.length > 20
                        ? props.project.name.substring(0, 20 - 3) + "..."
                        : props.project.name}
                </Name>
            </NameContainer>
        </>
    );
};

const AnimatedContainer = (props) => {
    const { open, tablet } = props;

    const styleProps = useSpring({
        from: { opacity: "0", zIndex: 0 },
        to: {
            opacity: open ? "1" : "0",
            zIndex: open ? 2 : 1,
            visibility: open ? "visible" : "hidden",
        },
    });

    return (
        <>
            <Container style={styleProps}>
                <ImageContainer>
                    <Link to={`/projects/${props.project.id}`}>
                        <Gif
                            src={
                                process.env.PUBLIC_URL +
                                props.project.gallery[0]
                            }
                        ></Gif>
                        <Img
                            src={
                                process.env.PUBLIC_URL +
                                props.project.gallery[1]
                            }
                        ></Img>
                    </Link>
                </ImageContainer>
                <AnimatedDescriptionContainer
                    open={open}
                    project={props.project}
                    tablet={tablet}
                ></AnimatedDescriptionContainer>
                <AnimatedNameContainer
                    open={open}
                    project={props.project}
                    tablet={tablet}
                ></AnimatedNameContainer>
                <AnimatedDetailsContainer
                    open={open}
                    project={props.project}
                    tablet={tablet}
                ></AnimatedDetailsContainer>
            </Container>
        </>
    );
};

export default class display extends Component {
    state = { open: false, tablet: false };

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        if (window.innerWidth < sizeNumber.tablet) {
            return this.setState({ tablet: true });
        }
        return this.setState({ tablet: false });
    };

    changeOpen = () => {
        this.setState({ open: !this.state.open });
    };

    componentDidUpdate() {
        if (
            this.props.project.id !== this.props.open &&
            this.state.open !== false
        ) {
            this.setState({ open: false });
        } else if (
            this.props.project.id === this.props.open &&
            this.state.open !== true
        ) {
            this.setState({ open: true });
        }
    }

    render() {
        const project = this.props.project;

        return (
            <AnimatedContainer
                open={this.state.open}
                project={project}
                tablet={this.state.tablet}
            ></AnimatedContainer>
        );
    }
}

const Container = styled(animated.div)`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    @media ${device.tablet} {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const NameContainer = styled(animated.div)`
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(99, 255, 239, 0.5);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    letter-spacing: 0.1rem;
    font-weight: bold;

    height: 70px;
    width: 100%;
    pointer-events: none;

    @media ${device.tablet} {
        top: 0;
        right: 0;

        width: 240px;
    }
`;

const Name = styled.div``;

const DescriptionContainer = styled(animated.div)`
    border: 1px solid rgba(99, 255, 239, 0.5);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    letter-spacing: 0.1rem;
    font-weight: bold;

    width: 100%;
    pointer-events: none;
    padding: 15px 0 15px 0;

    @media ${device.tablet} {
        bottom: 0;
        left: 0;

        width: auto;
        padding: 30px 40px;
    }
`;

const Description = styled.div`
    padding: 5px 0;
`;

const DetailsContainer = styled(animated.div)`
    border: 1px solid rgba(99, 255, 239, 0.5);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.1rem;
    font-weight: bold;

    position: absolute;
    width: 100%;
    pointer-events: none;
    height: 50px;

    @media ${device.tablet} {
        bottom: 0;
        left: 0;

        height: auto;
        width: auto;
        padding: 30px 40px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:link {
        color: black;
    }

    &:visited {
        color: black;
    }

    &:hover {
        color: black;
    }
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s all;
    @media ${device.tablet} {
        position: absolute;
    }
`;

const Gif = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s all;
    opacity: 0;
    display: none;
    @media ${device.tablet} {
        display: block;
        position: absolute;
    }
`;

const ImageContainer = styled(animated.div)`
    width: 100%;
    height: 100%;

    @media ${device.tablet} {
        &:hover ${Img} {
            opacity: 0;
        }

        &:hover ${Gif} {
            opacity: 1;
        }
    }
`;
