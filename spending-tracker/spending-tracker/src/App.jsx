import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import SpendingTracker from './SpendingTracker'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/spending-tracker">
      <AppBar position="static" className="gradient-appbar">
        <Toolbar>
          <Typography variant="h6" sx={{ marginRight: 'auto' }}>
            Spending Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/" className="purple-button">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/tracker" className="purple-button">
            Spending Tracker
          </Button>
        </Toolbar>
      </AppBar>
      

      <div className="app-root">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracker" element={<SpendingTracker />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
