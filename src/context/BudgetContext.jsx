import React, { useContext, useState} from "react";
import {v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorised"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    // const [summary, setSummary] = useState()

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    }
    

    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpense => {
            return [...prevExpense, {id: uuidV4(), description, amount, budgetId}]
        })
    }

    function deleteBudget(id) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id != id)
        })
    }

    function deleteExpense(id) {
        setExpenses(prevExpense => {
            return prevExpense.filter(expense => expense.id != id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}