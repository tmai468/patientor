import { State } from "./state";
import { Diagnosis, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "FIND_INDIVIDUAL_PATIENT";
    payload: string;
  }
  // | {
  //   type: "FETCH_DIAGNOSIS_CODE";
  //   payload: string;
  // };
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }

  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setDiagnosesList = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosesListFromApi
  };
};

export const addPatientToList = (patientToAdd: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patientToAdd
  };
};

export const findIndividualPatient = (patientId: string): Action => {
  return {
    type: "FIND_INDIVIDUAL_PATIENT",
    payload: patientId
  };
};

// export const fetchDiagnosisCode = (diagnosisCode: string): Action => {
//   return {
//     type: "FETCH_DIAGNOSIS_CODE",
//     payload: diagnosisCode
//   };
// };
export const updatePatient = (updatedPatient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: updatedPatient
  };
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FIND_INDIVIDUAL_PATIENT":
      console.log('inside this action');
      console.log('current state is');
      console.log(state.patients);
      console.log('id to be found is');
      console.log(action.payload);
      if (!(action.payload in state.patients)) {
        // axios.get(`${apiBaseUrl}/patients/${action.payload}`)
        void axios.get(`${apiBaseUrl}/patients/${action.payload}`).then((response) => {
          console.log('patient found! data is');
          console.log(response.data as Patient);
          const patientFound: Patient | undefined = response.data as Patient;
          let diagnosesDescription: Array<Diagnosis>;
          if (patientFound) {
            patientFound.entries.forEach(entry => {
              if (entry.diagnosisCodes) {
                console.log('found diagnosis code');
                console.log(entry.diagnosisCodes);
                void axios.get(`${apiBaseUrl}/diagnoses`).then(diagResponse => {
                  console.log('response for diagnoses desc');
                  console.log(diagResponse.data as Diagnosis[]);
                  const allDiagnoses: Diagnosis[] = diagResponse.data as Diagnosis[];
                  diagnosesDescription = allDiagnoses.filter(eachDiagnosis => entry.diagnosisCodes?.includes(eachDiagnosis.code));
                  console.log('relevant diagnoses are');
                  console.log(diagnosesDescription);
                });
              }
            });
          }
          console.log('state is');
          console.log({
            ...state,
            patients: {
              ...state.patients,
              [action.payload]: response.data as Patient,
    
            }
          }
        );
          return {
            ...state,
            patients: {
              ...state.patients,
              [action.payload]: response.data as Patient
            }
          };
        });
  //eslint-disable-next-line @typescript-eslint/no-unsafe-return
      }
      return {
        ...state,
        patients: {
          ...state.patients
        }
      };
    
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload
          }
        }
      };
    
    // case "FETCH_DIAGNOSIS_CODE":
    //   void axios.get(`${apiBaseUrl}/api/diagnosis`).then(response => {
    //     console.log('response data for fetching diagnosis is');
    //     console.log(response.data);
    //   });
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};
