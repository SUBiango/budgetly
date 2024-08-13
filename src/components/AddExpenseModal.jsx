import { useRef } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext"

function AddExpenseModal({ show, handleClose, defaultBudgetId}) {

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader closeButton>
                    <ModalTitle>New Expense</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <FormGroup className="mb-3" controlId="description">
                        <FormLabel>Description</FormLabel>
                        <FormControl ref={descriptionRef} type="text" required></FormControl>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="amount">
                        <FormLabel>Amount</FormLabel>
                        <FormControl
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="budgetId">
                        <FormLabel>Budget</FormLabel>
                        <FormSelect defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            
                            {budgets.map(budget => (
                            <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                            ))}
                        </FormSelect>
                    </FormGroup>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add Expense
                        </Button>
                    </div>
                </ModalBody>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal