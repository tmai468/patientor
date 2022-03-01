import React from "react";
import { NewEntry } from "../types";
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryFormWrapper from "./AddEntryFormWrapper";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (value: NewEntry) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                {error && <Segment>{`${error}`}</Segment>}
                <AddEntryFormWrapper onSubmit={onSubmit} onCancel={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;