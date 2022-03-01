import React from "react";
import { NewEntry } from "../types";
import * as yup from 'yup';
import { useStateValue } from "../state";
import { Formik, Form, Field, validateYupSchema } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import EntryTypeFields from "./EntryTypeFields";
import { Button, Grid } from "semantic-ui-react";


interface Props {
    initialValues: NewEntry;
    validationSchema: yup.ObjectSchema;
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}
const AddEntryForm: React.FC<Props> = ({
    initialValues,
    validationSchema,
    onSubmit,
    onCancel
}) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            validationSchema={validationSchema}
        >
        
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

            return (
                <Form className="form ui">
                    <Field
                        label="Description"
                        placeholder="Description"
                        name="description"
                        component={TextField}
                    />
                    <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                    />

                    <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                    />

                    <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnosis)}
                    />
                    {/* {console.log(`values is ${JSON.stringify(values)}`)} */}
                    <EntryTypeFields entryType = {values.type}/>

                    <Grid>
                        <Grid.Column floated="left" width={5}>
                            <Button type="button" onClick={onCancel} color="red">
                                Cancel
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated="right" width={5}>
                            <Button
                            type = "submit"
                            floated="right"
                            color="green"
                            disabled = {!dirty || !isValid}
                            >
                                Add
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            )
        }}
        </Formik>
    );
};

export default AddEntryForm;