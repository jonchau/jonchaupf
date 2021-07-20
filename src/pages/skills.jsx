import React, { Component, useState } from "react";
import styled from "styled-components";
import { device, sizeNumber } from "../components/device";
import PageTitle from "../components/pagetitle";
import CssIcon from "../images/csslogo-01.png";
import HtmlIcon from "../images/htmllogo-01.png";
import JsIcon from "../images/jslogo-01.png";
import PhpIcon from "../images/logo_php8-01.png";

import { useSpring, animated, config } from "react-spring";

const AnimatedDetail = (props) => {
    const { opacity, since } = props;

    const styledProps = useSpring({
        to: { opacity: opacity ? "1" : "0", scale: opacity ? "1" : "0" },
        config: config.stiff,
    });
    return <Detail style={styledProps}>since {since}</Detail>;
};

const AnimatedLinkContainer = () => {
    const [hover, setHover] = useState(0);

    const styledProps = useSpring({
        to: {
            transform: hover ? "translate(0px, 0px)" : " translate(8px, 8px)",
        },

        config: config.wobbly,
    });

    return (
        <StyledLinkContainer
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(0)}
        >
            <StyledLinkBackground style={styledProps}></StyledLinkBackground>
            <StyledLink>Hover for details</StyledLink>
        </StyledLinkContainer>
    );
};

export default class skills extends Component {
    state = {
        tablet: false,
        hovered: "",
        showDetails: false,
        skills: [
            {
                name: "Css",
                since: "2015",
                color: "rgb(220,220,220)",
                icon: CssIcon,
                row: "1/2",
                column: "3/4",
                scale: "1.2",
                degrees1: "60deg",
            },
            {
                name: "Html",
                since: "2015",
                color: "rgb(220,220,220)",
                icon: HtmlIcon,
                row: "2/3",
                column: "4/5",
                scale: "1.2",
                degrees1: "60deg",
                degrees2: "120deg",
            },
            {
                name: "Javascript",
                since: "2019",
                color: "black",
                icon: JsIcon,
                row: "4/5",
                column: "4/5",
                scale: "1",
                degrees1: "-60deg",
                degrees2: "120deg",
            },
            {
                name: "Php",
                since: "2016",
                color: "#8892BF",
                icon: PhpIcon,
                row: "3/4",
                column: "3/4",
                scale: "1.15",
                degrees1: "120deg",
                degrees2: "180deg",
            },
        ],
        randomSkills: [
            {
                name: "MySql",
                color: "rgb(230,230,230)",
                row: "3/4",
                column: "1/2",
            },
            {
                name: "Photoshop",
                color: "rgb(230,230,230)",
                row: "2/3",
                column: "6/7",
                degrees1: "120deg",
                degrees2: "0deg",
                newBg: "rgba(99, 255, 239, 0.5)",
            },
            {
                name: "Illustrator",
                color: "rgb(230,230,230)",
                row: "1/2",
                column: "5/6",
                degrees1: "60deg",
            },
            {
                name: "Premiere",
                color: "rgb(230,230,230)",
                row: "2/3",
                column: "8/9",
            },
            {
                name: "After Effects",
                color: "rgb(230,230,230)",
                row: "1/2",
                column: "7/8",
                degrees1: "180deg",
                degrees2: "60deg",
            },
            {
                name: "Github",
                color: "rgb(230,230,230)",
                row: "2/3",
                column: "2/3",
            },
            {
                name: "Xampp",
                color: "rgb(230,230,230)",
                row: "4/5",
                column: "2/3",
            },
            {
                name: "Unity",
                color: "rgb(230,230,230)",
                row: "4/5",
                column: "6/7",
            },
            {
                name: "Unreal Engine 4",
                color: "rgb(230,230,230)",
                row: "4/5",
                column: "8/9",
            },
            {
                name: "Maya",
                color: "rgb(230,230,230)",
                row: "3/4",
                column: "7/8",
                degrees1: "-180deg",
                degrees2: "120deg",
                degrees3: "60deg",
                newBg: "rgba(99, 255, 239, 0.5)",
            },
            {
                name: "C#",
                color: "rgb(230,230,230)",
                row: "5/6",
                column: "5/6",
                degrees1: "-60deg",
            },
            {
                name: "Nodejs",
                color: "rgb(230,230,230)",
                row: "5/6",
                column: "3/4",
            },
        ],
    };

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

    showDetails = () => {
        this.setState({ showDetails: true });
    };
    closeDetails = () => {
        this.setState({ showDetails: false });
    };

    render() {
        const MainSkills = this.state.skills
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((skill, index) => {
                return (
                    <div key={index}>
                        <SkillContainer
                            gridPos={`grid-row:${skill.row}; grid-column:${skill.column};`}
                        >
                            <AnimatedDetail
                                opacity={this.state.showDetails}
                                since={skill.since}
                            ></AnimatedDetail>
                            <SkillOutline
                                scale={this.state.tablet ? "1.4" : skill.scale}
                                color={"rgba(99, 255, 239, 0.5)"}
                            >
                                <Skill bgcolor={skill.color}>
                                    <SkillIcon src={skill.icon}></SkillIcon>
                                </Skill>
                            </SkillOutline>
                            {skill.degrees1 && !this.state.tablet && (
                                <Connection
                                    bgcolor={"rgba(99, 255, 239, 0.5)"}
                                    degrees={skill.degrees1}
                                ></Connection>
                            )}
                            {skill.degrees2 && !this.state.tablet && (
                                <Connection
                                    bgcolor={"rgba(99, 255, 239, 0.5)"}
                                    degrees={skill.degrees2}
                                ></Connection>
                            )}
                        </SkillContainer>
                        {this.state.tablet && (
                            <MobileDetail>Since {skill.since}</MobileDetail>
                        )}
                    </div>
                );
            });

        const ExtraSkills = this.state.randomSkills
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((skill, index) => {
                return (
                    <SkillContainer
                        key={index}
                        gridPos={`grid-row:${skill.row}; grid-column:${skill.column};`}
                    >
                        <SkillOutline
                            scale={this.state.tablet ? "0.9" : "0.8"}
                            color={"#ffc680"}
                        >
                            <Skill bgcolor={skill.color}>
                                <SkillNameContainer>
                                    <SkillName size={"0.95rem"}>
                                        {skill.name}
                                    </SkillName>
                                </SkillNameContainer>
                            </Skill>
                        </SkillOutline>
                        {skill.degrees1 && !this.state.tablet && (
                            <Connection
                                bgcolor={skill.newBg ? skill.newBg : "#ffc680"}
                                degrees={skill.degrees1}
                            ></Connection>
                        )}
                        {skill.degrees2 && !this.state.tablet && (
                            <Connection
                                bgcolor={"#ffc680"}
                                degrees={skill.degrees2}
                            ></Connection>
                        )}
                        {skill.degrees3 && !this.state.tablet && (
                            <Connection
                                bgcolor={"#ffc680"}
                                degrees={skill.degrees3}
                            ></Connection>
                        )}
                    </SkillContainer>
                );
            });

        return (
            <Container>
                <PageTitle title={"SKILLS"}></PageTitle>
                <Legend>
                    <LegendName grid={"grid-row: 1/2; grid-column:1/2;"}>
                        Main Skills
                    </LegendName>

                    <LegendSkill
                        color={"rgba(99, 255, 239, 0.5)"}
                        grid={"grid-row: 1/2; grid-column:2/3;"}
                        float={"end"}
                    ></LegendSkill>

                    <LegendName grid={"grid-row: 2/3; grid-column:1/2;"}>
                        Extra Skills
                    </LegendName>

                    <LegendSkill
                        color={"#ffc680"}
                        grid={"grid-row: 2/3; grid-column:2/3;"}
                        float={"end"}
                    ></LegendSkill>
                </Legend>
                <InnerContainer>
                    <MainSkillsGrid>{MainSkills}</MainSkillsGrid>
                    <ExtraSkillsGrid> {ExtraSkills}</ExtraSkillsGrid>
                    <PictureContainer>
                        <MyPicture
                            src={
                                process.env.PUBLIC_URL +
                                "/images/selfpicture.jpg"
                            }
                        ></MyPicture>
                    </PictureContainer>
                </InnerContainer>
                {!this.state.tablet && (
                    <SeeDetailsContainer
                        onMouseEnter={() => this.showDetails()}
                        onMouseLeave={() => this.closeDetails()}
                    >
                        <AnimatedLinkContainer></AnimatedLinkContainer>
                    </SeeDetailsContainer>
                )}
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
        min-height: 850px;
        margin: auto;
        position: relative;
        max-width: 1200px;
        padding-top: 0;
    }
`;

const InnerContainer = styled.div`
    @media ${device.tablet} {
        position: absolute;
        top: calc(50% - 30px);
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-rows: repeat(5, 115px);
        grid-template-columns: repeat(9, 70px);
    }
`;

const MainSkillsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    row-gap: 30px;
    margin: 80px 3% 0 3%;

    @media ${device.tablet} {
        margin: auto;
        display: block;
    }
`;

const ExtraSkillsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    margin: 30px 10% 50px 10%;

    @media ${device.tablet} {
        display: block;
        margin: auto;
    }
`;

const PictureContainer = styled.div`
    display: none;

    @media ${device.tablet} {
        display: block;
        width: 90.6px;
        height: 104px;
        background-color: rgba(99, 255, 239, 0.5);
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0% 25%);
        position: relative;
        grid-row: 3/4;
        grid-column: 5/6;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.3);
    }
`;

const MyPicture = styled.img`
    width: 100%;

    @media ${device.tablet} {
        width: 86.6px;
        height: 99px;
        object-fit: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0% 25%);
    }
`;

const SkillNameContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 2;
`;

const SkillName = styled.div`
    text-align: center;
    padding: 5px;
    font-size: ${(props) => props.size};
    word-break: break-word;
`;

const SkillContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.tablet} {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ${(props) => props.gridPos}
    }
`;

const SkillOutline = styled.div`
    position: relative;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0% 25%);
    background-color: ${(props) => props.color};
    width: 90.6px;
    height: 104px;
    z-index: 2;
    transform: scale(${(props) => props.scale});
`;

const Skill = styled.div`
    background-color: ${(props) => props.bgcolor};
    cursor: default;
    position: relative;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0% 25%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 86.6px;
    height: 99px;
    @media ${device.tablet} {
    }
`;

const SkillIcon = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Connection = styled.div`
    height: 2px;
    width: 120px;
    background-color: ${(props) => props.bgcolor};
    position: absolute;
    transform-origin: left;
    z-index: 1;
    top: 50%;
    left: 50%;
    // background-image: ${(props) => props.gradient};
    transform: rotate(${(props) => props.degrees});
`;

const Legend = styled.div`
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);
    width: 70%;
    margin: auto;
    padding: 15px 20px;
    display: grid;
    grid-template-column: 1fr 1fr;
    grid-template-row: 1fr 1fr;
    grid-gap: 10px 50px;

    @media ${device.tablet} {
        position: absolute;
        bottom: 120px;
        right: 30px;
        padding: 15px 20px;
        width: 180px;
    }
`;

const LegendName = styled.div`
    width: 100%;
    ${(props) => props.grid}
    display: flex;
    align-items: center;
`;

const LegendSkill = styled.div`
    background-color: ${(props) => props.color};
    width: 50px;
    height: 50px;
    justify-self: ${(props) => props.float};
    ${(props) => props.grid}
`;

const SeeDetailsContainer = styled.div`
    position: absolute;
    bottom: 120px;
    left: 30px;
`;

const StyledLinkContainer = styled.div`
    //box-shadow: 3px 3px 18px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(99, 255, 239, 0.8);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    width: 160px;
    height: 60px;
    position: relative;
`;

const StyledLink = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    text-decoration: none;
    z-index: 2;
    cursor: default;
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

const StyledLinkBackground = styled(animated.div)`
    width: 100%;
    height: 100%;
    background-color: rgba(99, 255, 239, 0.25);
    backdrop-filter: blur(5px);
    position: absolute;
    z-index: -1;
`;

const Detail = styled(animated.div)`
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    width: 100px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 10px;
    left: -40px;
    z-index: 3;
`;

const MobileDetail = styled.div`
    margin: 25px auto 20px auto;
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);
    display: block;
    z-index: 3;
    text-align: center;
    padding: 10px 0;
    max-width: 180px;
    width: 80%;
`;
