import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingList'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Tabs, Tab } from '@mui/material'

function App() {

  const [value, setValue] = useState(0)
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue === 0) {
      navigate('/customers')
    } else if (newValue === 1) {
      navigate('/trainings')
    }
  }
  

  return (
    <>
    <Tabs value={value} onChange={handleChange}>
        <Tab label="Customers" />
        <Tab label="Trainings" />
      </Tabs>
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </>
  )
}

export default App
