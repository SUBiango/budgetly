import { Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalHeader, ModalTitle, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetContext";

function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef()
    const maxRef =  useRef()
    const { addBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault()
        addBudget({
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Form onSubmit={handleSubmit}>
                <ModalHeader closeButton>
                    <ModalTitle>Add New Budget</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <FormGroup className="mb-3">
                        <FormLabel>Name</FormLabel>
                        <FormControl ref={nameRef} type="text" required></FormControl>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="max">
                            <FormLabel>Maximum Spending</FormLabel>
                            <FormControl 
                                ref={maxRef}
                                type="number" 
                                required 
                                min={0} 
                                step={0.01} />
                    </FormGroup>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" >
                            Add
                        </Button>
                    </div>
                </ModalBody>
            </Form>
        </Modal>
    )
}

export default AddBudgetModal