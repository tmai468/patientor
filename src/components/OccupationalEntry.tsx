import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalEntry : React.FC<{ occupationalEntry: OccupationalHealthcareEntry }> = ({ occupationalEntry }) => {
    const textStyle = {
        fontStyle: "italic",
        color: "gray"
    }
    return (
        <Segment>
            <h3>{occupationalEntry.date} <Icon name="stethoscope" size="large"></Icon> {occupationalEntry.employerName}</h3>
            <div style={textStyle}>{occupationalEntry.description}</div>
        </Segment>
    );
};

export default OccupationalEntry;