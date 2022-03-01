import { Formik } from "formik";
import React from "react";
import { NewEntry } from "../types";


interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    


    // return (
    //     <Formik
    //         initialValues={{

    //         }}>

    //     </Formik>
    // )
    return null;
};

export default AddEntryForm;