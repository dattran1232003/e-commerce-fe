import Navbar from './components/Navbar'
import AppRouter from './pages/AppRouter'

function App(): JSX.Element {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <AppRouter />
    </div>
  )
}

export default App
