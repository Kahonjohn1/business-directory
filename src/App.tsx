import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { DirectoryPage } from './pages/DirectoryPage'
import { BusinessDetailPage } from './pages/BusinessDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Root Application Component with Theme and Routing.
 * 
 * Routes:
 * - / -> Dedicated Landing Page (HomePage)
 * - /businesses -> Main directory with search, filter, and card grid
 * - /businesses/:id -> Dynamic single business detail page
 * - * -> Catch-all 404 page
 */
function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<HomePage />} />

              {/* Main Directory Route */}
              <Route path="/businesses" element={<DirectoryPage />} />

              {/* Business Detail Route (Dynamic :id parameter) */}
              <Route path="/businesses/:id" element={<BusinessDetailPage />} />

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App
