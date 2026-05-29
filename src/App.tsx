import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SnapMonk from './pages/SnapMonk'
import MonkTab from './pages/MonkTab'
import MonkKit from './pages/MonkKit'
import ShareMarket from './pages/ShareMarket'
import DynamicDNS from './pages/DynamicDNS'
import Privacy from './pages/Privacy'
import HydroMonk from './pages/HydroMonk'
import ShortStop from './pages/ShortStop'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snapmonk" element={<SnapMonk />} />
            <Route path="/monktab" element={<MonkTab />} />
            <Route path="/monkkit" element={<MonkKit />} />
            <Route path="/share-market" element={<ShareMarket />} />
            <Route path="/dynamic-dns" element={<DynamicDNS />} />
            <Route path="/hydromonk" element={<HydroMonk />} />
            <Route path="/shortstop" element={<ShortStop />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
