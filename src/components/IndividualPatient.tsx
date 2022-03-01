// import axios from "axios";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Icon, Button } from "semantic-ui-react";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";
import AddEntryModal from "../AddEntryModal";
// import AddPatientModal from "../AddPatientModal";
import { apiBaseUrl } from "../constants";
// import { apiBaseUrl } from "../constants";
// import { Patient } from "../types";
import { findIndividualPatient, updatePatient, useStateValue } from "../state";
import { EntryType, NewEntry, Patient } from "../types";
import EntryDetails from "./EntryDetails";
// import { Patient } from "../types";

const IndividualPatient = () => {
    const { id } = useParams<{ id: string }>();
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ patients, diagnosis}, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const openModal = (): void => {
        setModalOpen(true);
    }

    const submitNewEntry = async (values: NewEntry) => {
        const body = { ...values };

        if (body.type === EntryType.OccupationalHealthcare) {
            if (!body.sickLeave?.startDate && !body.sickLeave?.endDate) {
                body.sickLeave = undefined;
            }
        }

        try {
            const { data: returnedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                body
            );
            dispatch(updatePatient(returnedPatient));
            closeModal();
        } catch (e: unknown) {
            let errorMessage = "Something went wrong.";
            if (e instanceof Error) {
                errorMessage += ` ${e.message}`;
            }
            setError(errorMessage);
        }
    };
    // console.log(`id is ${id}`);
    // const patientFound = axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    // console.log('patient found is');
    // console.log(patientFound.data);
    // return <h1>Hola</h1>;
    React.useEffect(() => {
        if (id) {
            const fetchIndividualPatientInfo = () => {
                // const { data: patientFound } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                // console.log('patient found is');
                // console.log(patientFound);
                // dispatch({
                //     type: "FIND_INDIVIDUAL_PATIENT",
                //     payload: id
                // });
                dispatch(findIndividualPatient(id));
            };
            void fetchIndividualPatientInfo();
        }
    }, [id]);
    React.useEffect(() => {
        console.log('patients state changed! it now is');
        console.log(patients);
    }, [patients]);
    console.log('patients are');
    console.log(patients);
    console.log(patients[id]);
    if (!patients[id]) {
        console.log('not found');
        return null;
    }
    // const numEntries = patients[id].entries.length;
    return (
    <div>
        <h2>{patients[id].name} {patients[id].gender === "male" ? <Icon name="mars"></Icon> : (patients[id].gender === 'female' ? <Icon name="mercury"></Icon> : <Icon name="transgender"></Icon>)}</h2>
        <div>
            <div>
            ssn: {patients[id].ssn}
            </div>
            <div>
            occupation: {patients[id].occupation}
            </div>
        </div>
        <h3>entries</h3>
        <Grid verticalAlign='top' rows={patients[id].entries.length as SemanticWIDTHS}>
        {patients[id].entries.map(eachEntry => {
            // return <div key={eachEntry.id}>
            //     <div style={{"display": "inline"}}>{eachEntry.date}</div> <div style={{"fontStyle": "italic", "display": "inline" }}>{eachEntry.description}</div>
            //     {eachEntry.diagnosisCodes && <ul>{eachEntry.diagnosisCodes.map(diagnosisCode => {
            //         return (
            //             <li key={diagnosisCode}>{diagnosisCode} {diagnosis[diagnosisCode].name}</li>
            //         );
            //     })}</ul>}
            //     </div>;
            return <Grid.Row key={eachEntry.id}>
                    <Grid.Column>
                        <EntryDetails entry={eachEntry}/>
                    </Grid.Column>
                </Grid.Row>
        })}
        </Grid>
        <AddEntryModal
        modalOpen = {modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
        />
        <Button onClick={openModal}>Add New Entry</Button>
    </div>
    );
};

export default IndividualPatient;