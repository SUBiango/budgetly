import { Button, Modal, ModalBody, ModalHeader, ModalTitle, Stack } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

function ViewExpenseModal({ budgetId, handleClose, amount, max }) {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets();

    const expenses = getBudgetExpenses(budgetId)
    console.log(budgets)
    
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <Stack direction="horizontal" gap={2}>
                        <div className="me-2">Expense name</div>
                        <Button 
                            size="sm" 
                            className="me-3"
                            onClick={() => {
                                deleteBudget()
                                handleClose()
                            }}
                            >
                            Delete
                        </Button>
                        <div className="d-flex align-items-baseline">
                            {currencyFormatter.format(amount)}
                            <span className="text-muted fs-6 ms-1">
                                / {currencyFormatter.format(max)}
                            </span>
                        </div>
                    </Stack>
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Stack direction="vertical" gap={3}>
                   {expenses.map(expense => (
                       <Stack direction="horizontal" gap={2} key={expense.id}>
                            <div className="me-auto fs-4"> {expense.description} </div>
                            <div className="fs-5"> 
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button 
                                size="sm" 
                                variant="outline-danger"
                                onClick={() => deleteExpense(expense.id)}
                            >
                                &times;
                            </Button>
                        </Stack>
                   ))}
                </Stack>
            </ModalBody>
        </Modal>
    )
}

export default ViewExpenseModal