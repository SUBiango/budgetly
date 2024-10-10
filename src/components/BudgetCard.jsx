import { Button, Card, CardBody, CardTitle, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils";

function BudgetCard({
    name, 
    amount, 
    max, 
    onAddExpenseClick, 
    onViewExpenseClick
}) {
    
    return (
        <Card className="budget-card">
            <CardBody>
                <CardTitle className="d-flex justify-content-between 
                    align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        <span className="text-muted fs-6 ms-1">
                            / {currencyFormatter.format(max)}
                        </span>
                    </div>
                </CardTitle>
                <ProgressBar 
                    className="round-pill"
                    variant="secondary"
                    min={0}
                    max={max}
                    now={amount}
                />

                <Stack direction="horizontal" gap="3" className="mt-4 justify-content-between">
                    <Button size="sm" variant="outline-secondary" onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant="outline-secondary" size="sm" onClick={onViewExpenseClick}>View Expense</Button>
                </Stack>
            </CardBody>
        </Card>
    )
}


export default BudgetCard