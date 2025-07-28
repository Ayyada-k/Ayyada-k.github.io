import { useForm } from 'react-hook-form'
import DataTable from './components/DataTable'
import { useLocalStorage } from 'react-use'
import categories from './data/category.json'
import { useMemo } from 'react'

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
    <>
      <h2>Spending Tracker</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Category:
          <select {...register("category", { required: true })} defaultValue={allCategories[0]?.id}>
            {allCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input type="date" {...register("date", { required: true })} />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" step="1" {...register("amount", { required: true, min: 0 })} />
        </label>
        <br />
        <button type="submit">Add Spending</button>
      </form>
      <hr />
      <DataTable data={spendingRecords || []} onDelete={handleDelete} />
      <h3>Total Spending: {totalSpending} ฿</h3>
    </>
  )
}

export default SpendingTracker
