import { useState } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Pillars from './components/Pillars'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Freelance from './components/Freelance'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollTheme } from './hooks/useScrollTheme'

export default function App() {
  const { mode, cycleMode } = useScrollTheme()
  const [loading, setLoading] = useState(true)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', transition: 'background-color 0.3s ease' }}>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Cursor />
      <ScrollProgress />
      <Navbar mode={mode} cycleMode={cycleMode} />
      <main>
        <Hero />
        <Intro />
        <Pillars />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Freelance />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
