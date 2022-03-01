import React from "react";
import { Entry } from "../types";
import HealthCheckEntryComp from "./HealthCheckEntry";
// import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";


const assertNever = (object: never): never => {
    throw new Error(`missing entry type in union type: ${JSON.stringify(object)}`);
};

const EntryDetails : React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry hospitalEntry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalEntry occupationalEntry={entry}/>
        case "HealthCheck":
            return <HealthCheckEntryComp healthCheckEntry={entry}/>
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;