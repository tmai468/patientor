import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";

const HeartIcon : React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {
    switch (healthCheckRating) {
        case 0:
            return <Icon name="heart" color="green"></Icon>;
        case 1:
            return <Icon name="heart" color="yellow"></Icon>;
        case 2:
            return <Icon name="heart" color="orange"></Icon>
        case 3:
            return <Icon name="heart" color="red"></Icon>;
        default:
            throw new Error("Invalid health check rating");
    }
}

const HealthCheckEntryComp : React.FC<{ healthCheckEntry: HealthCheckEntry }> = ({ healthCheckEntry }) => {
    const textStyle = {
        fontStyle: "italic",
        color: "grey"
    };
    return (
        <Segment>
            <h3>{healthCheckEntry.date} <Icon name="doctor" size="large"></Icon></h3>
            <div style={textStyle}>{healthCheckEntry.description}</div>
            <HeartIcon healthCheckRating={healthCheckEntry.healthCheckRating}></HeartIcon>
        </Segment>
    );
};

export default HealthCheckEntryComp;