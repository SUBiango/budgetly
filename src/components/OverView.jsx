import { Card, CardBody, CardFooter, CardTitle, Stack } from "react-bootstrap"
import { useBudgets } from "../context/BudgetContext"
import { currencyFormatter } from "../utils"


function Overview() {
    
    const { budgets } = useBudgets()
    const isBudget = budgets.length < 1;
    const showFooter = budgets.length > 1;

    return (
        <div className="overview"> 
            <Card style={{ 
                width: '25rem',
                padding: '1rem'
            }}>
                
                {
                    // This conditionally renders different jsx based on the outcome of isBudget
                    isBudget 
                    ? <span>Please add budget</span> 
                    : <div>
                        <CardTitle className="overview-card-title"> Budget Overview </CardTitle>

                        <CardBody>
                            <Stack>
                                {budgets.map((budget) => (
                                    <Stack direction="horizontal" gap={2} key={budget.id}>
                                        <div className="me-auto fs-6"> {budget.name} </div>
                                        <div className="fs-6"> {currencyFormatter.format(budget.max)} </div>
                                    </Stack>
                                ))}
                            </Stack>
                            
                        </CardBody>
                        
                        { 
                            showFooter 
                            ? <CardFooter className="d-flex justify-content-between">
                                <div>Total Budgeted Amount: </div>
                                <div> {budgets.reduce((total, budget) => total + budget.max, 0)} </div>
                            </CardFooter>
                            : null
                        }
                        
                    </div>
                }
                
            </Card>
        </div>
    )
}

export default Overview