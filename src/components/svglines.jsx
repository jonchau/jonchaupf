import React from "react";
import styled from "styled-components";
import { device } from "../components/device";
import {
    useSpring,
    useChain,
    animated,
    useSpringRef,
    config,
} from "react-spring";

export default function Svglines(props) {
    const {
        open,
        svgs,
        location,
        containerWidth,
        containerHeight,
        strokeArray,
        tablet,
    } = props;
    const { circle1, circle2, path } = svgs;

    const springRef = useSpringRef();
    const transitionRef = useSpringRef();

    const { x } = useSpring({
        from: { x: "0" },
        to: { x: open ? "1" : "0" },
        ref: springRef,
        config: config.gentle,
    });

    const { r } = useSpring({
        from: { r: "0" },
        to: { r: open ? "5" : "0" },
        ref: transitionRef,
    });

    useChain([springRef, transitionRef], [0.2, 0.7]);

    if (tablet) {
        return null;
    }

    return (
        <>
            <SvgContainer
                width={containerWidth}
                height={containerHeight}
                location={location}
            >
                <animated.circle
                    cx={circle1.cx}
                    cy={circle1.cy}
                    r={r}
                    fill="rgba(99, 255, 239, 0.5)"
                ></animated.circle>
                <animated.circle
                    cx={circle2.cx}
                    cy={circle2.cy}
                    r={r}
                    fill="rgba(99, 255, 239, 0.5)"
                ></animated.circle>
                <animated.path
                    d={path.d}
                    stroke="rgba(99, 255, 239, 0.5)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={strokeArray}
                    strokeDashoffset={x.to((x) => (x - 1) * strokeArray)}
                ></animated.path>
            </SvgContainer>
        </>
    );
}

const SvgContainer = styled(animated.svg)`
    display: none;

    @media ${device.tablet} {
        z-index: 2;
        display: block;
        filter: drop-shadow(0px 0px 5px rgba(99, 255, 239, 1));
        position: absolute;
        pointer-events: none;
        ${(props) => props.location}
    }
`;
