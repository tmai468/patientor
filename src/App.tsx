import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setPatientList, useStateValue, setDiagnosesList } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import IndividualPatient from "./components/IndividualPatient";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
      } catch (e: unknown) {
        // console.error(e);
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(e) && e.response) {
          //eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          errorMessage += " Error: " + e.response.data.message;
        }
        console.error(errorMessage);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setDiagnosesList(diagnosesListFromApi));
      } catch (e: unknown) {
        // console.error(e);
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(e) && e.response) {
          //eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          errorMessage += " Error: " + e.response.data.message;
        }
        console.error(errorMessage);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <IndividualPatient/>
            </Route>
            <Route path="/patients">
              <PatientListPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
