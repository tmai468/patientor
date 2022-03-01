import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { Entry } from "../types";
// import { Grid, Segment } from "semantic-ui-react";


const HospitalEntry : React.FC<{ hospitalEntry: Entry }> = ({ hospitalEntry }) => {
    const textStyle = {
        fontStyle: "italic",
        color: "gray"
    };
    return (
        // <div class="ui stackable four column grid">
        //     <h3>{hospitalEntry.date}</h3>
        // </div>
        <Segment>
            <h3>{hospitalEntry.date} <Icon name="hospital" size="large"></Icon></h3>
            <div style={textStyle}>{hospitalEntry.description}</div>
        </Segment>

    );

};

export default HospitalEntry;