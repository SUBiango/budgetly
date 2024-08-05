import { Button, Modal, ModalHeader, ModalTitle, Stack } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

function ViewExpenseModal({ budgetId, handleClose, amount, max }) {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets();

    return (
        <Modal show={budgetId} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <Stack direction="horizontal" gap={2}>
                        <div className="me-2">Expense name</div>
                        <Button className="me-3">Delete</Button>
                        <div className="d-flex align-items-baseline">
                            {currencyFormatter.format(amount)}
                            <span className="text-muted fs-6 ms-1">
                                / {currencyFormatter.format(max)}
                            </span>
                        </div>
                    </Stack>
                </ModalTitle>
            </ModalHeader>
        </Modal>
    )
}

export default ViewExpenseModal