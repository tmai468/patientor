import { Formik } from "formik";
import React, { useCallback } from "react";
import { Divider, Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { EntryType, NewEntry } from "../types";
import AddEntryForm from "./AddEntryForm";
import * as yup from 'yup';


const options = [
    {
        key: EntryType.HealthCheck,
        value: EntryType.HealthCheck,
        text: "Health Check"
    },
    {
        key: EntryType.OccupationalHealthcare,
        value: EntryType.OccupationalHealthcare,
        text: "Occupational Health Care"
    },
    {
        key: EntryType.Hospital,
        value: EntryType.Hospital,
        text: "Hospital"
    }
]

const baseInitialValues = {
    description: "",
    date: "",
    specialist: ""
};

const healthCheckInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0
};

const occupationalHealthcareInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthcare,
    employerName: "",
    sickLeave: {
        startDate: "",
        endDate: ""
    }
};

const hospitalInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: {
        date: "",
        criteria: ""
    }
};

const baseSchema = yup.object().shape({
    description: yup.string().min(12).required(),
    date: yup.string()
    .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
    .required(),
    specialist: yup.string().min(6).required(),
    diagnosisCodes: yup.array().of(yup.string()),
});

const healthCheckSchema = baseSchema.concat(
    yup.object().shape({
        healthCheckRating: yup
        .number()
        .typeError("health check rating must be a number")
        .min(0)
        .max(3)
        .required("Please enter a rating from 0 (great) - 3 (critical)")
    })
);

const occupationalHealthcareSchema = baseSchema.concat(
    yup.object().shape({
        employerName: yup.string().min(3).required(),
        sickLeave: yup.object().shape({
            startDate: yup
            .string()
            .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),

            endDate: yup
            .string()
            .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
        }),
        
    })
);

const hospitalSchema = baseSchema.concat(
    yup.object().shape({
        discharge: yup.object().shape({
            date: yup.string()
            .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
            .required("Discharge date is a required field"),

            criteria: yup.string()
            .min(12)
            .required("Discharge criteria is a required field")
        })
    })
);

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

const AddEntryFormWrapper = ({ onSubmit, onCancel }: Props) => {
    const [entryType, setEntryType] = React.useState<EntryType>(EntryType.HealthCheck);

    const handleChange = (
        _e: React.SyntheticEvent,
        { value }: DropdownProps
    ): void => {
        if (value) {
            setEntryType(value as EntryType);
        }
    }

    const entryForm = useCallback(() => {
        switch (entryType) {
            case EntryType.HealthCheck:
                return (
                    <AddEntryForm
                       initialValues={healthCheckInitialValues}
                       validationSchema={healthCheckSchema}
                       onSubmit={onSubmit}
                       onCancel={onCancel} 
                    />
                );
            case EntryType.OccupationalHealthcare:
                return (
                    <AddEntryForm
                    initialValues={occupationalHealthcareInitialValues}
                    validationSchema={occupationalHealthcareSchema}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    />
                );
            case EntryType.Hospital:
                return (
                    <AddEntryForm
                    initialValues={hospitalInitialValues}
                    validationSchema={hospitalSchema}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    />
                );
            default:
                return null;
        }
    }, [entryType, onCancel, onSubmit]);

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Entry Type</label>
                    <Dropdown
                    fluid
                    onChange={handleChange}
                    options={options}
                    selection
                    value={entryType}
                    />
                </Form.Field> 
            </Form>

            <Divider />

            {entryForm()};



        </div>
    )
    
};

export default AddEntryFormWrapper;