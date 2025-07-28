import './Dashboard.css'
import React, { useState, useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { useLocalStorage } from 'react-use'
import categories from './data/category.json'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B']

function Dashboard() {
  const [spendingRecords] = useLocalStorage('spendingRecords', [])
  const [viewMode, setViewMode] = useState('daily') // daily, weekly, monthly
  const [chartTimeframe, setChartTimeframe] = useState('all') // 'all' or 'month'
  
  // Add category state
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [dynamicCategories, setDynamicCategories] = useLocalStorage('spendingCategories', [])

  // Combine static categories with dynamic ones
  const allCategories = useMemo(() => {
    return [...categories, ...(dynamicCategories || [])]
  }, [dynamicCategories])

  // Add new category
  const handleAddCategory = () => {
    if (!newCatName || !newCatIcon) return;
    const newCat = {
      id: Date.now().toString(),
      name: newCatName,
      icon: newCatIcon,
    };
    setDynamicCategories([...(dynamicCategories || []), newCat]);
    setNewCatName('');
    setNewCatIcon('');
  };

  // Selected month for filtering (format: "YYYY-MM")
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  // Filter records by timeframe & selectedMonth
  const filteredRecords = useMemo(() => {
    if (chartTimeframe === 'month') {
      const [year, month] = selectedMonth.split('-').map(Number)
      return (spendingRecords || []).filter(item => {
        const d = new Date(item.date)
        return d.getFullYear() === year && d.getMonth() + 1 === month
      })
    }
    return spendingRecords || []
  }, [spendingRecords, chartTimeframe, selectedMonth])

  // Group records by viewMode
  const groupedData = useMemo(() => {
    const grouped = {}
    filteredRecords.forEach(({ date, amount }) => {
      const d = new Date(date)
      let key = ''
      if (viewMode === 'daily') {
        key = d.toISOString().slice(0, 10) // YYYY-MM-DD
      } else if (viewMode === 'weekly') {
        const startOfWeek = new Date(d)
        startOfWeek.setDate(d.getDate() - d.getDay()) // Sunday start
        key = startOfWeek.toISOString().slice(0, 10)
      } else if (viewMode === 'monthly') {
        key = d.toISOString().slice(0, 7) // YYYY-MM
      }
      grouped[key] = (grouped[key] || 0) + amount
    })
    return Object.entries(grouped)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [filteredRecords, viewMode])

  // Total spending
  const totalSpending = filteredRecords.reduce((sum, item) => sum + item.amount, 0)

  // Pie chart data grouped by category
  const pieChartData = useMemo(() => {
    const grouped = {}
    filteredRecords.forEach(({ category, amount }) => {
      grouped[category] = (grouped[category] || 0) + amount
    })
    return Object.entries(grouped).map(([categoryId, amount]) => {
      const categoryInfo = allCategories.find(cat => cat.id === categoryId)
      return {
        name: categoryInfo ? `${categoryInfo.icon} ${categoryInfo.name}` : categoryId,
        amount,
        categoryId
      }
    })
  }, [filteredRecords, allCategories])

  return (
    <div className="home-root">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Card className="home-card" sx={{ minWidth: 300, maxWidth: 600, mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Spending Tracker
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Track your expenses and manage your spending efficiently.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/tracker"
            className="purple-tracker-button"
            fullWidth
          >
            Go to Spending Tracker
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>Month: </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{ padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>View Mode: </label>
          <select
            value={viewMode}
            onChange={e => setViewMode(e.target.value)}
            style={{ padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label>Chart Timeframe: </label>
          <select
            value={chartTimeframe}
            onChange={e => setChartTimeframe(e.target.value)}
            style={{ padding: 5, borderRadius: 5, border: '1px solid #ccc' }}
          >
            <option value="all">All Time</option>
            <option value="month">Selected Month</option>
          </select>
        </div>
      </div>

      {/* Total Spending */}
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Card sx={{ minWidth: 200, background: '#e8f5e8', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">Total Spending</Typography>
            <Typography variant="h4" className="purple-text">
              THB {totalSpending.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Charts */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Line Chart */}
        <Card sx={{ flex: 1, minWidth: 400, maxWidth: 800 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Spending Over Time
            </Typography>
            {groupedData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={groupedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={value => [`THB ${value}`, 'Amount']} />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No spending data available.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card sx={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Spending by Category
            </Typography>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={value => [`THB ${value}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No spending data available.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Stack>

      {/* Add New Category Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ➕ Add New Spending Category
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <input
              type="text"
              placeholder="Category name"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                minWidth: '200px'
              }}
            />
            <select
              value={newCatIcon}
              onChange={(e) => setNewCatIcon(e.target.value)}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                minWidth: '80px'
              }}
            >
              <option value="">Icon</option>
              <option value="🍔">🍔</option>
              <option value="🛒">🛒</option>
              <option value="💊">💊</option>
              <option value="🎮">🎮</option>
              <option value="🚗">🚗</option>
              <option value="📚">📚</option>
              <option value="🎁">🎁</option>
              <option value="💼">💼</option>
              <option value="🏠">🏠</option>
              <option value="🎓">🎓</option>
              <option value="✈️">✈️</option>
              <option value="🏥">🏥</option>
              <option value="🎵">🎵</option>
              <option value="👕">👕</option>
            </select>
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleAddCategory}
              disabled={!newCatName || !newCatIcon}
            >
              Add Category
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
