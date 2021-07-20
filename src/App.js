import "./App.css";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Skills from "./pages/skills";
import About from "./pages/about";
import ProjectDetails from "./pages/projectdetails";
import Footer from "./components/footer";
import { device } from "./components/device";
import BackgroundImage from "./images/3514948.png";

function App() {
    return (
        <div styles={{ backgroundImage: `url(${BackgroundImage})` }}>
            <Navbar></Navbar>
            <Container>
                <ContentWrap>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/projects/:slug"
                            component={ProjectDetails}
                        />

                        <Route exact path="/about" component={About} />
                        <Route exact path="/skills" component={Skills} />
                    </Switch>
                </ContentWrap>
                <Footer></Footer>
            </Container>
        </div>
    );
}

export default App;

const Container = styled.div`
    position: relative;
    min-height: 100vh;

    @media ${device.tablet} {
        //navbar width
        margin-left: 60px;
    }
`;
const ContentWrap = styled.div`
    //make this same height as footer
    //padding bottom is same as height of footer

    padding-bottom: 50px;

    @media ${device.tablet} {
        padding-bottom: 0;
    }
`;
