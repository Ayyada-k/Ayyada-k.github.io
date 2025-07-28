import { useForm } from 'react-hook-form'
import DataTable from './components/DataTable'
import { useLocalStorage } from 'react-use'
import categories from './data/category.json'
import { useMemo } from 'react'
import './SpendingTracker.css'

// Helper functions
function addSpendingRecord(records, newRecord) {
  return [...(records || []), newRecord]
}

function deleteSpendingRecord(records, id) {
  return (records || []).filter(record => record.id !== id)
}

function calculateTotalSpending(records) {
  return (records || []).reduce((sum, item) => sum + item.amount, 0)
}


function SpendingTracker() {
  const { register, handleSubmit, reset } = useForm()
  const [spendingRecords, setSpendingRecords] = useLocalStorage('spendingRecords', [])
  const [dynamicCategories] = useLocalStorage('spendingCategories', [])

  // Combine static categories with dynamic ones
  const allCategories = useMemo(() => {
    return [...categories, ...(dynamicCategories || [])]
  }, [dynamicCategories])

  const handleDelete = (id) => {
    const filteredRecords = deleteSpendingRecord(spendingRecords, id)
    setSpendingRecords(filteredRecords)
  }

  const onSubmit = (data) => {
    const record = {
      id: Date.now(),
      category: data.category,
      date: data.date,
      amount: parseFloat(data.amount)
    }
    const updatedRecords = addSpendingRecord(spendingRecords, record)
    setSpendingRecords(updatedRecords)
    reset()
  }

  const totalSpending = calculateTotalSpending(spendingRecords)

  return (
    <div className="spending-tracker">
      <h2>💳 Spending Tracker</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select"
                {...register("category", { required: true })} 
                defaultValue={allCategories[0]?.id}
              >
                {allCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                className="form-input"
                placeholder="Select a date"
                title="Click to open calendar picker"
                {...register("date", { required: true })} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Amount (฿)</label>
              <input 
                type="number" 
                step="1" 
                className="form-input"
                placeholder="Enter amount"
                {...register("amount", { required: true, min: 0 })} 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-button">
            Add Spending Record
          </button>
        </form>
      </div>

      <hr className="divider" />
      
      <div className="data-section">
        <h3 className="section-title">📊 Spending Records</h3>
        <DataTable data={spendingRecords || []} onDelete={handleDelete} />
        
        <div className="total-spending">
          <h3>Total Spending: {totalSpending.toLocaleString()} ฿</h3>
        </div>
      </div>
    </div>
  )
}

export default SpendingTracker
