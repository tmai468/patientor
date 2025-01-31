import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  // const { id } = useParams<{ id: string }>();
  // console.log('id is');
  // console.log(id);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
//   React.useEffect(() => {
//     const fetchIndividualPatientInfo = async () => {
//         const { data: patientFound } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
//         console.log('patient found is');
//         console.log(patientFound);
//     };
//     void fetchIndividualPatientInfo();
// }, [id]);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e: unknown) {
      // console.log('error is');
      // console.log(e);
      // // if (e.response) {

      // // }
      // // console.error(e.response)
      // const { message } = e as Error;
      // console.error(message || 'Unknown Error');
      // setError(message || 'Unknown error');
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data);
        //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorMessage = e.response.data.error;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell><Link to={`/patients/${patient.id}`}>{patient.name}</Link></Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
