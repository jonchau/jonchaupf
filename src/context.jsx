import React, { Component } from "react";
import Client from "./contentful";

export const Context = React.createContext();

export class Provider extends Component {
    state = { projects: [], intro: "" };

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "info",
                order: "sys.createdAt",
                //order:"fields.price"
            });

            let projects = this.formatData(response.items);

            this.setState(
                {
                    projects: projects,
                },
                () => {
                    // console.log(this.state.projects);
                    // console.log(response.items);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    getIntro = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "myintro",
                order: "sys.createdAt",
                //order:"fields.price"
            });

            let intro = response.items[0].fields.intro;

            this.setState({ intro: intro }, () => {});
        } catch (error) {
            console.log(error);
        }
    };

    formatData = (items) => {
        let tempItems = items.map((item) => {
            let id = item.sys.id;
            let content = item.fields.content;
            let description = item.fields.description;
            let name = item.fields.name;
            let gallery = item.fields.gallery;
            let webLink = item.fields.link;

            let project = { id, content, description, name, gallery, webLink };
            return project;
        });
        return tempItems;
    };

    getProject = (id) => {
        let tempProject = [...this.state.projects];
        tempProject = tempProject.filter((project) => project.id === id);
        tempProject = tempProject[0];

        return tempProject;
    };

    componentDidMount() {
        this.getData();
        this.getIntro();
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    getProject: this.getProject,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
