import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative min-h-screen overflow-hidden">
          <NeuralBackground />

          {/* Ambient gradient blobs */}
          <div
            className="gradient-blob"
            style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
              top: '5%', left: '-10%',
              animationDelay: '0s',
            }}
          />
          <div
            className="gradient-blob"
            style={{
              width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(178,75,243,0.05) 0%, transparent 70%)',
              top: '40%', right: '-8%',
              animationDelay: '-4s',
            }}
          />
          <div
            className="gradient-blob"
            style={{
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)',
              bottom: '10%', left: '30%',
              animationDelay: '-8s',
            }}
          />

          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;