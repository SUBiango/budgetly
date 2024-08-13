import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Stack } from 'react-bootstrap';
import Header from './components/Header';
import BudgetCard from './components/BudgetCard';
import './App.css'
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpenseModal from './components/ViewExpenseModal';
import Overview from './components/OverView';
import { useBudgets } from './context/BudgetContext';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModal, setViewExpenseModal] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='container'>
        <Header />
        
        <Stack direction='horizontal' gap="3" className='p-4'>
          <h1 className='me-auto'>Budgelty</h1>
          <Button variant='primary' className='btn-add-budget' onClick={() => setShowAddBudgetModal(true)}> Add Budget </Button>
          <Button className='btn-add-expense' onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>


        <div className='content-wrapper'>

        <Overview />
        
          <div style={{
            display: 'grid',
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.4rem",
            alignItems: "flex-start"
          }}>
            
            {budgets.map(budget => {
              const expenses = getBudgetExpenses(budget.id)

              const amount = expenses.reduce(
                (total, expense) => total + expense.amount,
                0
              )
              return (
                <BudgetCard 
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpenseClick={() => setViewExpenseModal(budget.id)}
                />
              )
            })}
          </div>
        </div>
      </Container>
      <AddBudgetModal 
        show={showAddBudgetModal}
        handleClose={() => {setShowAddBudgetModal(false)}}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpenseModal 
        budgetId={viewExpenseModal}
        handleClose={() => setViewExpenseModal()}
      />
    </>
  )
}

export default App
