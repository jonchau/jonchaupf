import React, { Component, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Context } from "../context";
import Loading from "./loading";
import { device, sizeNumber } from "./device";
import AnimatedSvg from "./svglines";
import PageTitle from "./pagetitle";
import {
    useSpring,
    animated,
    config,
    useTransition,
    useSpringRef,
} from "react-spring";
import { withRouter } from "react-router-dom";

const AnimatedLinkContainer = (props) => {
    const { webLink } = props;

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
            <StyledLink
                onClick={() => props.openFunctionCallback(`${webLink}`)}
            >
                See Website
            </StyledLink>
        </StyledLinkContainer>
    );
};

const AnimatedContainer = (props) => {
    const {
        imageGallery,
        contentSections,
        tags,
        project,
        tablet,
        slug,
        prevSlug,
        style,
    } = props;
    /* 
    const [slugy, set] = useState(slug);

    const transRef = useSpringRef();

    const transitions = useTransition(slugy, {
        ref: transRef,
        keys: null,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        delay: 150,
        config: config.slow,
    });

    useEffect(() => {
        set(slug);
        transRef.start();
    }, [slugy, slug]);

    const { id } = project; */

    /*  return (
        <>
            {transitions((style, i) => { */
    return (
        <Container style={style}>
            <Content>
                <Name>
                    {project.name}
                    <AnimatedSvg
                        tablet={tablet}
                        //open={open}
                        svgs={{
                            circle1: { cx: "57", cy: "41" },
                            circle2: { cx: "25", cy: "180" },
                            path: {
                                d: "M 25 175 l 0 -80 l 30 -50",
                            },
                        }}
                        location={"left: -30px; top: 55px;"}
                        containerWidth={"150"}
                        containerHeight={"250"}
                        strokeArray={140}
                    ></AnimatedSvg>
                </Name>
                <HeroImageContainer>
                    <HeroImage
                        src={process.env.PUBLIC_URL + project.gallery[1]}
                        /*    onClick={() =>
                            this.openInNewTab(`${project.gallery[1]}`)
                        } */
                    ></HeroImage>
                    <ImageUnderline></ImageUnderline>
                </HeroImageContainer>
                <TagContainer>
                    {tags}
                    <AnimatedSvg
                        tablet={tablet}
                        //open={open}
                        svgs={{
                            circle1: { cx: "194", cy: "87" },
                            circle2: { cx: "27", cy: "20" },
                            path: {
                                d: "M 30 23 l 40 40 l 100 0 l 30 30",
                            },
                        }}
                        location={"left:-180px; bottom: 40px;"}
                        containerWidth={"250"}
                        containerHeight={"100"}
                        strokeArray={186}
                    ></AnimatedSvg>
                </TagContainer>
            </Content>
            <DescriptionContainer>{contentSections}</DescriptionContainer>
            <AnimatedLinkContainer
                webLink={project.webLink}
                // openFunctionCallback={this.openLinkToWebsite}
            ></AnimatedLinkContainer>
            <GalleryContainer>{imageGallery}</GalleryContainer>
        </Container>
        /*              );
            })}
        </> */
    );
};

class projectdisplay extends Component {
    state = {
        slug: this.props.match.params.slug,
        tablet: false,
        prevSlug: "",
    };

    static contextType = Context;

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.slug !== this.props.match.params.slug) {
            this.setState({ slug: this.props.match.params.slug });
        }
    }

    resize = () => {
        if (window.innerWidth < sizeNumber.tablet) {
            return this.setState({ tablet: true });
        }
        return this.setState({ tablet: false });
    };

    openInNewTab = (url) => {
        const newWindow = window.open(
            process.env.PUBLIC_URL + url,
            "_blank",
            "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
    };

    openLinkToWebsite = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    render() {
        const { tablet, slug } = this.state;

        //console.log(this.props);
        /*  const { getProject } = this.context;

        const project = getProject(slug); */

        //console.log(project);

        /*    if (!project) {
            return <div></div>;
        }
 */
        //const { open } = this.props;

        const { content, description, gallery, id, name, webLink } =
            this.props.project;

        //  console.log(this.state.slug);

        const tags = description.map((tag, index) => {
            return (
                <div key={index}>
                    <Tag>{tag}</Tag>
                </div>
            );
        });

        const contentSections = content.map((section, index) => {
            return (
                <ContentContainer key={index}>
                    {section.image && (
                        <ContentImageContainer>
                            <ContentImage
                                src={process.env.PUBLIC_URL + section.image}
                                onClick={() =>
                                    this.openInNewTab(`${section.image}`)
                                }
                            ></ContentImage>
                            <ImageUnderline></ImageUnderline>
                            <AnimatedSvg
                                tablet={tablet}
                                //open={open}
                                svgs={{
                                    circle1: { cx: "60", cy: "30" },
                                    circle2: { cx: "113", cy: "148" },
                                    path: {
                                        d: "M 60 35 l 0 60 l 50 50",
                                    },
                                }}
                                location={"left: -30px; bottom: 30px;"}
                                containerWidth={"150"}
                                containerHeight={"200"}
                                strokeArray={140}
                            ></AnimatedSvg>
                        </ContentImageContainer>
                    )}
                    <Description
                        translate={
                            section.image ? "transform: translateX(70px);" : ""
                        }
                    >
                        {section.description}
                    </Description>
                </ContentContainer>
            );
        });

        const imageGallery = gallery.map((image, index) => {
            return (
                <GalleryImageContainer
                    key={index}
                    onClick={() => this.openInNewTab(`${image}`)}
                >
                    <GalleryImage
                        src={process.env.PUBLIC_URL + image}
                    ></GalleryImage>
                    <ImageUnderline></ImageUnderline>
                </GalleryImageContainer>
            );
        });

        return (
            <Container style={this.props.style}>
                <Content>
                    <Name>
                        {name}
                        <AnimatedSvg
                            tablet={tablet}
                            //open={open}
                            svgs={{
                                circle1: { cx: "57", cy: "41" },
                                circle2: { cx: "25", cy: "180" },
                                path: {
                                    d: "M 25 175 l 0 -80 l 30 -50",
                                },
                            }}
                            location={"left: -30px; top: 55px;"}
                            containerWidth={"150"}
                            containerHeight={"250"}
                            strokeArray={140}
                        ></AnimatedSvg>
                    </Name>
                    <HeroImageContainer>
                        <HeroImage
                            src={process.env.PUBLIC_URL + gallery[1]}
                            /*    onClick={() =>
                            this.openInNewTab(`${project.gallery[1]}`)
                        } */
                        ></HeroImage>
                        <ImageUnderline></ImageUnderline>
                    </HeroImageContainer>
                    <TagContainer>
                        {tags}
                        <AnimatedSvg
                            tablet={tablet}
                            //open={open}
                            svgs={{
                                circle1: { cx: "194", cy: "87" },
                                circle2: { cx: "27", cy: "20" },
                                path: {
                                    d: "M 30 23 l 40 40 l 100 0 l 30 30",
                                },
                            }}
                            location={"left:-180px; bottom: 40px;"}
                            containerWidth={"250"}
                            containerHeight={"100"}
                            strokeArray={186}
                        ></AnimatedSvg>
                    </TagContainer>
                </Content>
                <DescriptionContainer>{contentSections}</DescriptionContainer>
                <GalleryContainer>{imageGallery}</GalleryContainer>
            </Container>
        );
    }
}

export default withRouter(projectdisplay);

const Container = styled(animated.div)`
    margin: auto;
    display: ${(props) => props.open};
    position: absolute;
    @media ${device.tablet} {
        grid-template-rows: 1fr auto auto auto;
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
        max-width: 1200px;
        margin: auto;
    }
`;

const Content = styled.div`
    box-sizing: border-box;

    @media ${device.tablet} {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 6;
        position: relative;

        margin-bottom: 80px;
    }
`;

const Name = styled.div`
    text-align: center;
    padding: 40px 30px;

    border: 1px solid rgba(99, 255, 239, 0.5);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);

    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    margin-bottom: 10px;

    @media ${device.tablet} {
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.4);
        max-width: 400px;
        margin-bottom: auto;
        position: absolute;
        top: -30px;
        left: 30px;
    }
`;

const ImageUnderline = styled.div`
    position: absolute;
    top: -2px;
    height: 2px;
    width: 100%;

    background-color: rgba(99, 255, 239, 0);
    transition: 0.7s all;
    box-shadow: 0px 0px 5px rgba(99, 255, 239, 0);
    transform: scale(0);
`;

const HeroImageContainer = styled.div`
    width: 100%;
    height: 600px;
    box-shadow: 3px 3px 18px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin-bottom: 10px;

    position: relative;

    transition: 0.4s all;

    @media ${device.tablet} {
        margin-bottom: auto;

        &:hover {
            box-shadow: 3px 3px 18px rgba(0, 0, 0, 0);
        }

        &:hover ${ImageUnderline} {
            transform: scale(1);
            box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);
            background-color: rgba(99, 255, 239, 0.6);
        }
    }
`;

const HeroImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const TagContainer = styled.div`
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);

    letter-spacing: 0.1rem;
    font-size: 1.2rem;
    padding: 20px 30px;

    @media ${device.tablet} {
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.4);
        padding: 40px 40px;
        position: absolute;
        bottom: -30px;
        right: 30px;
    }
`;

const Tag = styled.div`
    padding: 5px 0;
    @media ${device.tablet} {
        padding: 10px 0;
    }
`;

const DescriptionContainer = styled.div`
    margin: 0 0 10px 0;

    @media ${device.tablet} {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 6;

        //margin right 70px to match the description textbox translate 70px
        margin: 10px 70px 10px 0;
    }
`;
const ContentContainer = styled.div`
    position: relative;
`;
const ContentImageContainer = styled.div`
    &:hover ${ImageUnderline} {
        transform: scale(1);
        box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);
        background-color: rgba(99, 255, 239, 0.6);
    }
`;
const ContentImage = styled.img`
    width: 100%;
    height: 350px;
    object-fit: cover;
    cursor: pointer;
`;

const Description = styled.div`
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    border: 1px solid rgba(99, 255, 239, 0.5);
    backdrop-filter: blur(5px);
    font-size: 1.1rem;
    padding: 20px;
    margin: 10px 0 30px 0;

    @media ${device.tablet} {
        background-color: rgba(255, 255, 255, 0.4);
        padding: 30px;
        margin: 10px 0 30px 0;
        ${(props) => props.translate}
    }
`;

const StyledLinkContainer = styled.div`
    border: 1px solid rgba(99, 255, 239, 0.8);
    box-shadow: 0 0 10px rgba(99, 255, 239, 0.5);
    width: 190px;
    height: 60px;
    margin: 80px auto;

    position: relative;

    @media ${device.tablet} {
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 4;
        grid-column-end: 6;

        justify-self: end;
        margin: 30px 0;
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

const StyledLink = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.1rem;
    font-size: 1.1rem;
    text-decoration: none;
    cursor: pointer;

    z-index: 2;

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
const GalleryContainer = styled.div`
    @media ${device.tablet} {
        //5px less margin for left and right to compensate for img margins

        // margin: 50px 0 120px 0;
        grid-row-start: 4;
        grid-row-end: 5;
        grid-column-start: 1;
        grid-column-end: 6;
    }
`;
const GalleryImageContainer = styled.div`
    position: relative;
    @media ${device.tablet} {
        // margin: 1px;
        padding: 1px;
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        cursor: pointer;
        &:hover ${ImageUnderline} {
            transform: scale(1);
            box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);
            background-color: rgba(99, 255, 239, 0.5);
        }
    }
`;

const GalleryImage = styled.img`
    width: 100%;
    object-fit: cover;
`;
