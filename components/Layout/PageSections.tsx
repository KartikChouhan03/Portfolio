'use client';

import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Projects from '@/components/projects/Projects';
import Lab from '@/components/lab/Lab';
import Skills from '@/components/skills/Skills';
import Journey from '@/components/journey/Journey';
import Contact from '@/components/contact/Contact';

// ─────────────────────────────────────────────────────────────────────────────
// PageSections
//
// Root composition container that stacks the home page sections in layout order.
// Renders inside the main layout content zone.
// ─────────────────────────────────────────────────────────────────────────────

export function PageSections() {
  return (
    <>
      <div id="hero" data-section-id="hero">
        <Hero />
      </div>
      <About />
      <Projects />
      <Lab />
      <Skills />
      <Journey />
      <Contact />
    </>
  );
}

export default PageSections;
