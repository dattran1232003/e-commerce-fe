import Navbar from './components/Navbar/Navbar'
import AppRouter from './pages/AppRouter'
import { useAxiosInstance } from '@/adapters/axios'

function App(): JSX.Element {
  const axios = useAxiosInstance()

  axios.get('/product/v1/products', { data: { offset: 0, limit: 10 } })
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
