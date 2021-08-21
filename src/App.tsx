import Navbar from './components/Navbar/Navbar'
import AppRouter from './pages/AppRouter'
import { useAxiosInstance } from '@/adapters/axios'
import { useEffect } from 'react'

function App(): JSX.Element {
  const axios = useAxiosInstance()

  useEffect(() => {
    axios
      .get('/v1/products', {
        data: { offset: 0, limit: 10 },
      })
      .catch(console.error)
  }, [])

  return (
    <AppRouter>
      <div className="App">
        <header>
          <Navbar />
        </header>
      </div>
    </AppRouter>
  )
}

export default App
