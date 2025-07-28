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
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Spending Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/tracker">
            Spending Tracker
          </Button>
        </Toolbar>
      </AppBar>
      

      <div className="app-root">
        <Dashboard />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracker" element={<SpendingTracker />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
