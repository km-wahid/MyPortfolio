import Portfolio from '@/components/Portfolio';
import { profile } from '@/data/portfolio';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'Bangladesh' },
    sameAs: profile.socials.filter((item) => item.label !== 'Email').map((item) => item.href),
    knowsAbout: ['Node.js', 'AdonisJS', 'Real-time Systems', 'Artificial Intelligence', 'Python', 'Django', 'System Design'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Portfolio />
    </>
  );
}
