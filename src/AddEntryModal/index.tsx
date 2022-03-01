import React from "react";
import { NewEntry } from "../types";
import { Modal, Segment } from 'semantic-ui-react';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (value: NewEntry) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
    </Modal>
};

export default AddEntryModal;