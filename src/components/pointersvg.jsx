import React from "react";
import styled from "styled-components";
import { device } from "../components/device";
import { useSpring, animated, config } from "react-spring";

export default function Pointersvg(props) {
    const {
        hovered,
        tablet,
        scaleAfter,
        scaleBefore,
        location,
        position,
        fillAfter,
        fillBefore,
    } = props;

    const { fill } = useSpring({
        to: {
            fill: hovered ? fillAfter : fillBefore,
        },
        config: config.gentle,
    });

    const { transform } = useSpring({
        to: async (next) => {
            while (1) {
                await next({ transform: "translate(0,0)" });
                await next({ transform: "translate(6,0)" });
            }
        },
        from: { transform: "translate(0,0)" },
        config: { duration: 1000 },
    });

    const styledProps = useSpring({
        to: {
            transform: hovered ? scaleAfter : scaleBefore,
        },
        config: config.gentle,
    });

    if (tablet) {
        return null;
    }

    return (
        <PointerSvg
            width="55"
            height="50"
            style={styledProps}
            location={location}
            position={position}
        >
            <animated.circle
                cx="22"
                cy="25.5"
                r="4"
                strokeWidth="2"
                fill={fill}
            ></animated.circle>
            <animated.path
                d="M 5 25 l 8 8 l 0 -15 l -8 8"
                strokeWidth="2"
                fill={fill}
            ></animated.path>
            <animated.path
                transform={transform}
                d=" M 51 25.5 l -20 -4 l 0 8 l 20 -4 "
                strokeWidth="1"
                fill={fill}
            ></animated.path>
        </PointerSvg>
    );
}

const PointerSvg = styled(animated.svg)`
    display: none;

    @media ${device.tablet} {
        z-index: 45;
        pointer-events: none;
        filter: drop-shadow(0px 0px 5px rgba(99, 255, 239, 1));
        display: block;
        opacity: 1;
        position: ${(props) => props.position};
        ${(props) => props.location}
    }
`;
