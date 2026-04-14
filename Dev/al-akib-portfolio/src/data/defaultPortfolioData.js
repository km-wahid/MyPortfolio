const defaultPortfolioData = {
  header: {
    prompt: '[AL-AKIB@PORTFOLIO ~]$',
    links: [
      { label: 'about', cmd: '--to=about', targetId: 'about' },
      { label: 'skills', cmd: '--to=skills', targetId: 'skills' },
      { label: 'projects', cmd: '--to=projects', targetId: 'projects' },
      { label: 'timeline', cmd: '--to=timeline', targetId: 'timeline' },
      { label: 'certs', cmd: '--to=certifications', targetId: 'certifications' },
      { label: 'contact', cmd: '--to=contact', targetId: 'contact' },
    ],
  },
  hero: {
    name: 'Al-Akib',
    designation: 'Network Engineer | CSE Graduate',
    statusText: 'Open to opportunities in networking and infrastructure automation.',
    primaryButtonText: './view --projects',
    primaryButtonTarget: 'projects',
    secondaryButtonText: './contact --me',
    secondaryButtonTarget: 'contact',
    socials: [
      { label: '[GH]', href: 'https://github.com/' },
      { label: '[LI]', href: 'https://linkedin.com/' },
    ],
  },
  about: {
    bio: "I'm Al-Akib, a Computer Science & Engineering graduate specializing in Network Engineering. Experienced in designing, securing, and automating network infrastructure from the physical layer to the cloud.",
    details:
      'Deep hands-on experience with routing protocols, network security, packet analysis, and Python-based automation across Cisco environments.',
    degree: 'B.Sc. CSE — Networking Major',
    status: 'OPEN_TO_OPPORTUNITIES',
    mode: 'Full-time | Remote | Relocation',
  },
  skills: [
    {
      category: 'Networking Protocols',
      id: 'NET-01',
      skills: [
        { name: 'TCP/IP', tip: 'Foundation of internet communication — layers 3 & 4' },
        { name: 'OSPF', tip: 'Link-state IGP using Dijkstra algorithm for SPF' },
        { name: 'BGP', tip: 'Path-vector EGP — backbone of the Internet' },
      ],
    },
    {
      category: 'Security',
      id: 'SEC-02',
      skills: [
        { name: 'Firewalls', tip: 'Stateful packet inspection and rule-based filtering' },
        { name: 'IDS/IPS', tip: 'Intrusion detection and inline prevention systems' },
        { name: 'Wireshark', tip: 'Deep packet inspection and protocol analysis' },
      ],
    },
  ],
  projects: [
    {
      slug: 'campus-network',
      title: 'Enterprise Campus Network Design',
      desc: 'Designed a multi-floor campus network with VLANs, OSPF, and redundancy.',
      details: [
        'Multi-floor topology with distribution and access layers',
        'Inter-VLAN routing via Layer 3 switch',
      ],
      tags: ['Cisco', 'OSPF', 'VLAN'],
      icon: '🏢',
      link: '#',
    },
    {
      slug: 'nids',
      title: 'Network Intrusion Detection System',
      desc: 'Python-based NIDS detecting scans and spoofing with alerting.',
      details: [
        'Real-time packet capture with Scapy',
        'Threshold-based detection and logging',
      ],
      tags: ['Python', 'Scapy', 'Security'],
      icon: '🛡️',
      link: '#',
    },
  ],
  timeline: [
    {
      year: '2025',
      title: 'Network Engineer',
      organization: 'Freelance / Lab Projects',
      summary: 'Designed and automated network infrastructure and security workflows.',
    },
    {
      year: '2024',
      title: 'CSE Graduate',
      organization: 'University',
      summary: 'Completed B.Sc. with focus on networking and cloud infrastructure.',
    },
  ],
  certifications: [
    { name: 'Cisco CCNA', issuer: 'Cisco Systems', year: '2024', iconName: 'shield', color: '#00bceb', badge: 'VERIFIED' },
    { name: 'CompTIA Network+', issuer: 'CompTIA', year: '2023', iconName: 'shield', color: '#c8102e', badge: 'VERIFIED' },
  ],
  contacts: [
    { icon: 'mail', key: 'EMAIL', val: 'al-akib@email.com', href: 'mailto:al-akib@email.com' },
    { icon: 'linkedin', key: 'LINKEDIN', val: 'linkedin.com/in/al-akib', href: 'https://linkedin.com' },
    { icon: 'github', key: 'GITHUB', val: 'github.com/al-akib', href: 'https://github.com' },
    { icon: 'location', key: 'STATUS', val: 'Remote | Relocation OK', href: '' },
  ],
  footer: {
    year: '2025',
    name: 'Al-Akib',
    designation: 'B.Sc. CSE · Network Engineer',
    status: 'ONLINE',
  },
};

export default defaultPortfolioData;
