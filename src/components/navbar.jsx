import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { device, sizeNumber } from "../components/device";
import disableScroll from "disable-scroll";
import Loading from "../components/loading";
import Carousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PointerSvg from "../components/pointersvg";
import { useSpring, animated, config } from "react-spring";

const AnimatedContactContainer = () => {
    const [hovered, setHovered] = useState(0);

    const styledProps = useSpring({
        to: {
            transform: hovered ? "scale(1)" : "scale(0)",
            opacity: hovered ? "1" : "0",
        },
        config: config.stiff,
    });

    const titleProps = useSpring({
        to: {
            opacity: hovered ? "1" : "0",
        },
        config: { duration: 300 },
    });

    const styledUnderline = useSpring({
        to: {
            backgroundColor: hovered
                ? "rgba(99, 255, 239, 0.7)"
                : "rgba(99, 255, 239, 0)",
            transform: hovered ? "scale(1)" : "scale(0)",
            borderLeft: hovered
                ? "1px solid rgba(99, 255, 239, 0.7)"
                : "1px solid rgba(99, 255, 239, 0)",
        },
        config: config.gentle,
    });

    const popupUnderline = useSpring({
        to: {
            backgroundColor: hovered
                ? "rgba(99, 255, 239, 0.5)"
                : "rgba(99, 255, 239, 0)",

            width: hovered ? "281px" : "0px",
        },
        config: config.gentle,
    });

    return (
        <div
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
        >
            <ContactContainer>
                <Title style={titleProps}>CONTACT</Title>
                <ContactPopout style={styledProps}>
                    JONCHAU0404@GMAIL.COM
                </ContactPopout>
                <Contact
                    src={process.env.PUBLIC_URL + "/images/contacticon.png"}
                ></Contact>
                <HoveredUnderline
                    style={styledUnderline}
                    position={"left: calc(50% - 13px);"}
                ></HoveredUnderline>
                <ContactPopupUnderline
                    style={popupUnderline}
                ></ContactPopupUnderline>
            </ContactContainer>
        </div>
    );
};

const AnimatedNavLink = (props) => {
    const { icon, size, name } = props;

    const [hovered, setHovered] = useState(0);

    const styledProps = useSpring({
        to: {
            backgroundColor: hovered
                ? "rgba(99, 255, 239, 0.7)"
                : "rgba(99, 255, 239, 0)",
            transform: hovered ? "scale(1)" : "scale(0)",
        },
        config: config.gentle,
    });

    const titleProps = useSpring({
        to: {
            opacity: hovered ? "1" : "0",
        },
        config: config.slow,
    });

    return (
        <div
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
        >
            <NavLink>
                <Logo src={process.env.PUBLIC_URL + icon} size={size}></Logo>
                <LinkTitle style={titleProps}>{name}</LinkTitle>
                <HoveredUnderline style={styledProps}></HoveredUnderline>
            </NavLink>
        </div>
    );
};

class navbar extends Component {
    state = {
        currentIndex: 0,
        changeLocation: false,
        scrolling: false,
        responsive: { 0: { items: 3 } },
        isOpen: false,
        tablet: false,
        load: false,
        links: [
            {
                name: "HOME",
                icon: "/images/jonlogo.png",
                link: "/",
                index: 0,
                size: "width: 20px;",
            },
            {
                name: "SKILLS",
                icon: "/images/skillsicon.png",
                link: "/skills",
                index: 1,
                size: "width: 20px;",
            },
            {
                name: "ABOUT",
                icon: "/images/abouticon.png",
                link: "/about",
                index: 2,
                size: "width: 24px;",
            },
        ],
    };

    componentDidUpdate(prevProps) {
        if (this.state.scrolling === "ready") {
            this.setState({ scrolling: false }, () => {
                this.changePage(this.state.currentIndex);
            });
        }

        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.checkLocation();
            this.setState({ isOpen: false });
        }

        if (this.state.tablet) {
            if (this.state.isOpen) {
                return disableScroll.on();
            }
            return disableScroll.off();
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();

        window.addEventListener("wheel", (e) => {
            this.scroll(e.deltaY * -1);
        });
        this.checkLocation();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
        window.removeEventListener("wheel", (e) => {
            this.scroll(e.deltaY * -1);
        });
    }

    resize = () => {
        if (window.innerWidth < sizeNumber.tablet) {
            return this.setState({ tablet: true });
        }
        return this.setState({ tablet: false });
    };

    checkLocation = () => {
        const { pathname } = this.props.location;

        if (pathname === "/") {
            return this.setState({ currentIndex: 0 });
        }

        if (pathname === "/skills") {
            return this.setState({ currentIndex: 1 });
        }

        if (pathname === "/about") {
            return this.setState({ currentIndex: 2 });
        }

        if (pathname === "/projects") {
            return this.setState({ currentIndex: 3 });
        }
    };

    changePage = () => {
        const { currentIndex } = this.state;

        if (currentIndex === 0) {
            return this.props.history.push("/");
        }

        if (currentIndex === 1) {
            return this.props.history.push("/skills");
        }

        if (currentIndex === 2) {
            return this.props.history.push("/about");
        }

        if (currentIndex === 3) {
            return this.props.history.push("/projects");
        }
    };

    scroll = (y) => {
        if (this.state.changeLocation && !this.state.tablet) {
            this.setState({ scrolling: true });

            clearTimeout(this.timeout);
            clearTimeout(this.timeout2);
            if (y < 0) {
                this.slideNext();
            } else if (y > 0) {
                this.slidePrev();
            }

            this.timeout2 = setTimeout(() => {
                this.setState({ load: true }, () => {});
            }, 500);

            this.timeout = setTimeout(() => {
                this.setState({ scrolling: "ready", load: false }, () => {});
            }, 1500);
        }
    };

    enter = () => {
        this.setState({
            changeLocation: true,
        });
        disableScroll.on();
    };

    leave = () => {
        this.setState({
            changeLocation: false,
        });
        disableScroll.off();
    };

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    changeIndex = (i) => {
        this.setState({ currentIndex: i });
    };

    slideTo = (i) => this.setState({ currentIndex: i });

    onSlideChanged = (e) => this.setState({ currentIndex: e.item });

    slideNext = () =>
        this.setState({ currentIndex: this.state.currentIndex + 1 });

    slidePrev = () =>
        this.setState({ currentIndex: this.state.currentIndex - 1 });

    render() {
        const { currentIndex, responsive, isOpen } = this.state;

        const navigationLinks = this.state.links.map((link) => {
            return (
                <StyledLink to={`${link.link}`} key={link.index}>
                    <div onClick={() => this.changeIndex(link.index)}>
                        <AnimatedNavLink
                            icon={link.icon}
                            size={
                                this.state.tablet ? "width: 40px;" : link.size
                            }
                            name={link.name}
                            changeLocation={this.state.changeLocation}
                        ></AnimatedNavLink>
                    </div>
                </StyledLink>
            );
        });

        return (
            <>
                <Container
                    onMouseEnter={() => this.enter()}
                    onMouseLeave={() => this.leave()}
                    open={this.state.isOpen ? "height: 100%;" : "height: 80px;"}
                >
                    <LargeDeviceNavbar>
                        <CarouselContainer state={this.state.isOpen}>
                            <Carousel
                                dotsDisabled={true}
                                buttonsDisabled={true}
                                slideToIndex={currentIndex}
                                onSlideChanged={this.onSlideChanged}
                                preservePosition={true}
                                responsive={responsive}
                            >
                                {navigationLinks}
                            </Carousel>
                        </CarouselContainer>
                    </LargeDeviceNavbar>

                    {/*--------------------------------------navbar for small screen-----------------------------------------*/}
                    <SmallDeviceNavbar>
                        {navigationLinks}
                        <Button onClick={this.handleToggle}>
                            <Bar1 opacity={isOpen ? "0" : "1"}></Bar1>
                            <Bar2
                                transform={
                                    isOpen
                                        ? "translate(-50%, -50%) rotate(45deg)"
                                        : "translate(-50%, -50%) rotate(0)"
                                }
                            ></Bar2>
                            <Bar3
                                transform={
                                    isOpen
                                        ? "translate(-50%, -50%) rotate(-45deg)"
                                        : "translate(-50%, -50%) rotate(0)"
                                }
                            ></Bar3>
                            <Bar4 opacity={isOpen ? "0" : "1"}></Bar4>
                        </Button>
                    </SmallDeviceNavbar>
                </Container>

                <PointerSvg
                    hovered={this.state.changeLocation}
                    tablet={this.state.tablet}
                    scaleAfter={"scale(0)"}
                    scaleBefore={"scale(0.65)"}
                    fillAfter={"rgba(99, 255, 239, 0)"}
                    fillBefore={"rgba(99, 255, 239, 0.6)"}
                    location={"top: calc(50% - 125px); left: 36px;"}
                    position={"fixed"}
                ></PointerSvg>
                <AnimatedContactContainer></AnimatedContactContainer>
                {this.state.load && (
                    <LoadingContainer>
                        <Loading scale={"0.5"}></Loading>
                    </LoadingContainer>
                )}
            </>
        );
    }
}

export default withRouter(navbar);

const Container = styled.div`
    ${(props) => props.open}
    width: 100%;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    top: 0;
    z-index: 44;
    backdrop-filter: blur(5px);
    overflow: hidden;
    transition: 0.5s all;

    @media ${device.tablet} {
        background-color: rgba(255, 255, 255, 0);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        height: 100%;

        width: 60px;
    }
`;

const LargeDeviceNavbar = styled.div`
    display: none;

    @media ${device.tablet} {
        display: block;
    }
`;

const SmallDeviceNavbar = styled.div`
    margin: auto 0;
    position: relative;
    display: block;
    overflow: none;

    @media ${device.tablet} {
        display: none;
    }
`;

const Logo = styled.img`
    ${(props) => props.size}
`;

const ContactContainer = styled.div`
    display: none;
    @media ${device.tablet} {
        display: block;
        position: fixed;
        bottom: 0;
        left: 30px;

        transform: translateX(-50%);
        padding: 20px 40px;
        text-align: center;
        z-index: 45;
    }
`;

const Title = styled(animated.div)`
    position: absolute;
    left: 86px;
    top: -38px;

    font-size: 0.7rem;
    letter-spacing: 0.1rem;

    backdrop-filter: blur(5px);
    padding: 10px 15px 10px 5px;
`;

const ContactPopout = styled(animated.div)`
    display: none;
    @media ${device.tablet} {
        opacity: 0;
        position: absolute;
        top: -5px;
        left: 90px;

        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(5px);

        height: 60px;
        width: 280px;
        display: flex;
        align-items: center;
        justify-content: center;

        transform-origin: 20% 0%;
        font-size: 0.85rem;
        letter-spacing: 0.05rem;
    }
`;

const Contact = styled.img`
    height: 22px;
`;

const ContactPopupUnderline = styled(animated.div)`
    position: absolute;
    top: -6px;
    left: 90px;
    height: 1px;
    box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);
`;

const NavLink = styled(animated.div)`
    text-align: center;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 0 10px white;
    opacity: ${(props) => props.transform};
    padding-bottom: 20px;

    @media ${device.tablet} {
        transform: rotate(-90deg);
        height: 300px;
        padding-bottom: 0;
    }
`;

const LinkTitle = styled(animated.div)`
    display: none;
    @media ${device.tablet} {
        display: block;
        position: absolute;
        font-size: 0.5rem;
        top: calc(50% - 35px);
        letter-spacing: 0.05rem;
    }
`;

const HoveredUnderline = styled(animated.div)`
    @media ${device.tablet} {
        position: absolute;
        height: 1px;
        width: 26px;
        top: calc(50% - 20px);
        ${(props) => props.position}
        box-shadow: 0px 0px 5px rgba(99, 255, 239, 1);
    }
`;

const CarouselContainer = styled.div`
    width: 300px;
    transform: rotate(90deg) translate(-50%, -50%);
    transform-origin: 0 0;
    position: fixed;
    left: 30px;
    top: 50%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 0.9rem;
    opacity: ${(props) => props.transform};

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

const Button = styled.button`
    text-decoration: none;
    border: 1px solid rgb(60, 60, 60);
    height: 30px;
    width: 30px;
    position: absolute;
    top: 26px;
    right: 20px;
    background-color: rgba(255, 255, 255, 0);

    @media ${device.tablet} {
        display: none;
    }
`;

const Bar1 = styled.div`
    position: absolute;
    background-color: rgb(80, 80, 80);
    left: 50%;
    top: 6px;
    transform: translateX(-50%);
    height: 2px;
    width: 18px;
    transition: 0.5s all;
    opacity: ${(props) => props.opacity};
`;

const Bar2 = styled.div`
    position: absolute;
    background-color: rgb(80, 80, 80);
    left: 50%;
    top: 50%;
    height: 2px;
    width: 18px;
    transition: 0.5s all;
    transform: ${(props) => props.transform};
`;

const Bar3 = styled.div`
    position: absolute;
    background-color: rgb(80, 80, 80);
    left: 50%;
    top: 50%;
    height: 2px;
    width: 18px;
    transition: 0.5s all;
    transform: ${(props) => props.transform};
`;

const Bar4 = styled.div`
    position: absolute;
    background-color: rgb(80, 80, 80);
    left: 50%;
    transform: translateX(-50%);
    bottom: 6px;
    height: 2px;
    width: 18px;
    transition: 0.5s all;
    opacity: ${(props) => props.opacity};
`;

const LoadingContainer = styled.div`
    display: none;

    @media ${device.tablet} {
        display: block;
        position: fixed;
        z-index: 45;
        top: calc(50% - 210px);
        left: 5px;
        pointer-events: none;
    }
`;
