import React, { Component } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const AnimatedLoading = (props) => {
    const { x } = useSpring({
        loop: true,
        from: { x: "0" },
        to: { x: "1" },

        config: { duration: props.speed === 2 ? 2000 : 1000 },
    });

    const { stroke } = useSpring({
        loop: true,
        from: { stroke: "rgba(99, 255, 239, 0)" },
        to: [
            { stroke: "rgba(99, 255, 239, 1)" },
            { stroke: "rgba(99, 255, 239, 0)" },
        ],
        config: { duration: 1000 },
    });

    return (
        <LoadingSvg width="50px" height="50px">
            <animated.circle
                cx="25"
                cy="25"
                r="20"
                strokeWidth="2"
                stroke={stroke}
                fill="none"
                strokeDasharray={170}
                strokeDashoffset={x.to((x) => (x - 1) * 170)}
            ></animated.circle>
        </LoadingSvg>
    );
};

export default class loading extends Component {
    render() {
        return (
            <Container scale={this.props.scale}>
                <AnimatedLoading speed={this.props.speed}></AnimatedLoading>
            </Container>
        );
    }
}

const Container = styled.div`
    transform: scale(${(props) => props.scale});
`;

const LoadingSvg = styled(animated.svg)`
    filter: drop-shadow(0px 0px 5px rgba(99, 255, 239, 1));
`;
