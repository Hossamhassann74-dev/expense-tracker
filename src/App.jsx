import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [description,setDescription]=useState("")
  const [amount,setAmount]=useState("")
  const [category,setCategory]=useState("")
  const [incomeInput,setIncomeInput]=useState("")
  const [income,setIncome]=useState(0)
  const [expenses,setExpenses]=useState(()=>{
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses):[]
  })

  const totalExpenses = expenses.reduce((total,expense)=>{
    return total + expense.amount;

  },0)
  const balance= income - totalExpenses ;

  const deleteExpense = (index)=>{
    setExpenses(expenses.filter((_,i)=>i !== index))
  }

  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses))
  },[expenses])

  return (
    <>

        <header>
          <h1>Expense Tracker</h1>
          <p>Manage your income and expenses</p>
        </header> 
        <main>
          <section className='summary'>
            <div>
              Balance + {balance}$
            </div>
            <div>
              Income + {income}$
            </div>
            <div>
              Expenses + {totalExpenses}$
            </div>
          </section>
          <section>
            <h2>Add Income</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              if (!incomeInput || Number(incomeInput) <=0) {
                return;
              }
              setIncome(income+Number(incomeInput))
              setIncomeInput("")
            }}>
              <input 
                type="number"
                placeholder='Your Income'
                value={incomeInput}
                onChange={(e)=>setIncomeInput(e.target.value)} 
              />
              <button>Add Income</button>
            </form>
          </section>
          <section className='expense-form'>
            <h2>Add Expense</h2>
            <form action=""
              onSubmit={(e)=>{
                e.preventDefault();

                if (!description || !amount || !category || Number(amount)<=0) {
                  return ;
                }
                
                const newExpense ={
                  description: description,
                  amount: Number(amount),
                  category: category
                };
                setExpenses([...expenses,newExpense]);
                setDescription("");
                setAmount("");
                setCategory("");
              }}
            >
              <input 
              type="text" 
              placeholder='Expense description' 
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              />
              <input
               type="number" 
               placeholder='Amount' 
               value={amount}
               onChange={(e)=>setAmount(e.target.value)}
               />
             <select 
              name="category" 
              id="" 
              value={category}
              onChange={(e)=>setCategory(e.target.value)}

              >
                <option value="" disabled>Select category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="other">Other</option>
              </select>

              <button>Add Expense</button>
            </form>
          </section>
          <section className='expenses-list'>
            <h2>Expenses</h2>
            {expenses.map((expense,index)=>(
              <div className='expense-card' key={index}>
                <strong>{expense.category}</strong>
                <h3>{expense.description}</h3>
                <span>{expense.amount}$</span>
                <button onClick={()=>deleteExpense(index)} className='del-button' >
                  Delete
                </button>
              </div>
            ))}
            <div></div>
          </section>
        </main>  
    </>

  )
}

export default App
