import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import ModelMarquee from './components/ModelMarquee.tsx'
import Products from './components/Products.tsx'
import Platform from './components/Platform.tsx'
import Stats from './components/Stats.tsx'
import Closing from './components/Closing.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <ModelMarquee />
        <Products />
        <Platform />
        <Stats />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
