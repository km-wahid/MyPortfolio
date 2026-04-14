import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  CONTENT_STORAGE_KEY,
  defaultSiteContent,
  loadSiteContent,
  ProjectItem,
  ServiceItem,
  saveSiteContent,
  SiteContent,
  SocialLink,
  resetSiteContent,
} from '../content/siteContent';

const ADMIN_PASSWORD_HASH = 'f8e499fbae403631287cd3c283343e773a677650c88ebb9bed724abe6d5d548b';

const emptyProject = (): ProjectItem => ({
  id: Date.now(),
  title: '',
  image: '',
  tech: [],
  problem: '',
  solution: '',
  impact: '',
  github: '',
  demo: '',
  description: '',
  accentColor: '#13FFAA',
});

const emptyService = (): ServiceItem => ({
  id: Date.now(),
  title: '',
  description: '',
  highlights: [],
  accent: 'rgba(19,255,170,0.25)',
});

const hashText = async (value: string): Promise<string> => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const AdminPanel: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('portfolio-admin-auth') === '1');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [content, setContent] = useState<SiteContent>(() => loadSiteContent());
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectDraft, setProjectDraft] = useState<ProjectItem>(() => emptyProject());
  const [socialDraft, setSocialDraft] = useState<SocialLink>({ label: '', href: '' });
  const [skillDraft, setSkillDraft] = useState('');
  const [serviceDraft, setServiceDraft] = useState<ServiceItem>(() => emptyService());
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const selectedProject = useMemo(
    () => content.projects.items.find((p) => p.id === selectedProjectId) ?? null,
    [content.projects.items, selectedProjectId]
  );

  const saveAll = () => {
    saveSiteContent(content);
    setStatus('Saved successfully.');
  };

  useEffect(() => {
    saveSiteContent(content);
  }, [content]);

  const resetAll = () => {
    resetSiteContent();
    setContent(defaultSiteContent);
    setSelectedProjectId(null);
    setProjectDraft(emptyProject());
    setStatus('Reset to defaults.');
  };

  const loadProjectToForm = (project: ProjectItem) => {
    setSelectedProjectId(project.id);
    setProjectDraft(project);
  };

  const saveProject = () => {
    if (!projectDraft.title.trim()) {
      setStatus('Project title is required.');
      return;
    }
    setContent((prev) => {
      const exists = prev.projects.items.some((p) => p.id === projectDraft.id);
      const items = exists
        ? prev.projects.items.map((p) => (p.id === projectDraft.id ? projectDraft : p))
        : [...prev.projects.items, { ...projectDraft, id: Date.now() }];
      return { ...prev, projects: { ...prev.projects, items } };
    });
    setProjectDraft(emptyProject());
    setSelectedProjectId(null);
    setStatus('Project saved.');
  };

  const deleteProject = (id: number) => {
    setContent((prev) => ({
      ...prev,
      projects: { ...prev.projects, items: prev.projects.items.filter((p) => p.id !== id) },
    }));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
      setProjectDraft(emptyProject());
    }
  };

  const addSocial = () => {
    if (!socialDraft.label.trim() || !socialDraft.href.trim()) return;
    setContent((prev) => ({ ...prev, socials: [...prev.socials, socialDraft] }));
    setSocialDraft({ label: '', href: '' });
  };

  const deleteSocial = (index: number) => {
    setContent((prev) => ({ ...prev, socials: prev.socials.filter((_, i) => i !== index) }));
  };

  const addSkill = () => {
    if (!skillDraft.trim()) return;
    setContent((prev) => ({ ...prev, skills: { ...prev.skills, items: [...prev.skills.items, skillDraft.trim()] } }));
    setSkillDraft('');
  };

  const deleteSkill = (index: number) => {
    setContent((prev) => ({
      ...prev,
      skills: { ...prev.skills, items: prev.skills.items.filter((_, i) => i !== index) },
    }));
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    const hashedInput = await hashText(passwordInput);
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem('portfolio-admin-auth', '1');
      setIsAuthed(true);
      setAuthError('');
      return;
    }
    setAuthError('Incorrect password');
  };

  const saveService = () => {
    if (!serviceDraft.title.trim()) {
      setStatus('Service title is required.');
      return;
    }
    setContent((prev) => {
      const exists = prev.services.items.some((s) => s.id === serviceDraft.id);
      const items = exists
        ? prev.services.items.map((s) => (s.id === serviceDraft.id ? serviceDraft : s))
        : [...prev.services.items, { ...serviceDraft, id: Date.now() }];
      return { ...prev, services: { ...prev.services, items } };
    });
    setServiceDraft(emptyService());
    setSelectedServiceId(null);
    setStatus('Service saved.');
  };

  const editService = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    setServiceDraft(service);
  };

  const deleteService = (id: number) => {
    setContent((prev) => ({
      ...prev,
      services: { ...prev.services, items: prev.services.items.filter((s) => s.id !== id) },
    }));
    if (selectedServiceId === id) {
      setSelectedServiceId(null);
      setServiceDraft(emptyService());
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white p-5 md:p-8 grid place-content-center">
        <form onSubmit={handleAuth} className="glass rounded-2xl p-6 w-[min(92vw,420px)]">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-400 text-sm mb-4">Enter password to access /admin</p>
          <input
            type="password"
            className="terminal-input mb-3"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Admin password"
          />
          {authError && <p className="text-accent-error text-sm mb-3">{authError}</p>}
          <button type="submit" className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-5 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Portfolio Admin Panel</h1>
          <div className="flex gap-2">
            <a href="/" className="px-4 py-2 rounded-lg border border-white/20">Open Website</a>
            <button onClick={saveAll} className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">Save</button>
            <button onClick={resetAll} className="px-4 py-2 rounded-lg bg-neon-purple/20 border border-neon-purple/40">Reset</button>
            <button
              onClick={() => {
                sessionStorage.removeItem('portfolio-admin-auth');
                setIsAuthed(false);
              }}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        {status && <p className="mb-4 text-neon-blue">{status}</p>}
        <p className="mb-8 text-sm text-gray-400">Storage key: {CONTENT_STORAGE_KEY}</p>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Hero</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input className="terminal-input" value={content.hero.badge} onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })} placeholder="Badge" />
            <input className="terminal-input" value={content.hero.ctaText} onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })} placeholder="CTA Text" />
            <input className="terminal-input" value={content.hero.titleLine1} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleLine1: e.target.value } })} placeholder="Title line 1" />
            <input className="terminal-input" value={content.hero.titleLine2} onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleLine2: e.target.value } })} placeholder="Title line 2" />
            <input className="terminal-input md:col-span-2" value={content.hero.roles.join(', ')} onChange={(e) => setContent({ ...content, hero: { ...content.hero, roles: e.target.value.split(',').map((r) => r.trim()).filter(Boolean) } })} placeholder="Roles (comma separated)" />
          </div>
        </section>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <input className="terminal-input mb-3" value={content.about.title} onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })} placeholder="Title" />
          <input className="terminal-input mb-3" value={content.about.subtitle} onChange={(e) => setContent({ ...content, about: { ...content.about, subtitle: e.target.value } })} placeholder="Subtitle" />
          <textarea
            className="terminal-input min-h-40"
            value={content.about.paragraphs.join('\n\n')}
            onChange={(e) => setContent({ ...content, about: { ...content.about, paragraphs: e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean) } })}
            placeholder="About paragraphs (separate by blank line)"
          />
        </section>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Projects (CRUD)</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2">Title</th>
                  <th className="py-2">Tech</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.projects.items.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-2">{p.title}</td>
                    <td className="py-2">{p.tech.join(', ')}</td>
                    <td className="py-2 flex gap-2">
                      <button onClick={() => loadProjectToForm(p)} className="px-2 py-1 rounded bg-white/10">Edit</button>
                      <button onClick={() => deleteProject(p.id)} className="px-2 py-1 rounded bg-red-500/30">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <input className="terminal-input" placeholder="Project title" value={projectDraft.title} onChange={(e) => setProjectDraft({ ...projectDraft, title: e.target.value })} />
            <input className="terminal-input" placeholder="Image URL" value={projectDraft.image} onChange={(e) => setProjectDraft({ ...projectDraft, image: e.target.value })} />
            <input className="terminal-input md:col-span-2" placeholder="Tech (comma separated)" value={projectDraft.tech.join(', ')} onChange={(e) => setProjectDraft({ ...projectDraft, tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
            <input className="terminal-input" placeholder="Problem" value={projectDraft.problem} onChange={(e) => setProjectDraft({ ...projectDraft, problem: e.target.value })} />
            <input className="terminal-input" placeholder="Solution" value={projectDraft.solution} onChange={(e) => setProjectDraft({ ...projectDraft, solution: e.target.value })} />
            <input className="terminal-input" placeholder="Impact" value={projectDraft.impact} onChange={(e) => setProjectDraft({ ...projectDraft, impact: e.target.value })} />
            <input className="terminal-input" placeholder="Accent color (e.g. #13FFAA)" value={projectDraft.accentColor} onChange={(e) => setProjectDraft({ ...projectDraft, accentColor: e.target.value })} />
            <input className="terminal-input" placeholder="GitHub URL" value={projectDraft.github ?? ''} onChange={(e) => setProjectDraft({ ...projectDraft, github: e.target.value })} />
            <input className="terminal-input" placeholder="Demo URL/Text" value={projectDraft.demo ?? ''} onChange={(e) => setProjectDraft({ ...projectDraft, demo: e.target.value })} />
            <textarea className="terminal-input md:col-span-2 min-h-28" placeholder="Description" value={projectDraft.description} onChange={(e) => setProjectDraft({ ...projectDraft, description: e.target.value })} />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={saveProject} className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">{selectedProject ? 'Update Project' : 'Add Project'}</button>
            <button onClick={() => { setSelectedProjectId(null); setProjectDraft(emptyProject()); }} className="px-4 py-2 rounded-lg bg-white/10">Clear</button>
          </div>
        </section>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Services (CRUD)</h2>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <input className="terminal-input" value={content.services.title} onChange={(e) => setContent({ ...content, services: { ...content.services, title: e.target.value } })} placeholder="Services section title" />
            <input className="terminal-input" value={content.services.subtitle} onChange={(e) => setContent({ ...content, services: { ...content.services, subtitle: e.target.value } })} placeholder="Services section subtitle" />
            <input className="terminal-input" value={content.services.fiverrLabel} onChange={(e) => setContent({ ...content, services: { ...content.services, fiverrLabel: e.target.value } })} placeholder="Fiverr button label" />
            <input className="terminal-input" value={content.services.fiverrUrl} onChange={(e) => setContent({ ...content, services: { ...content.services, fiverrUrl: e.target.value } })} placeholder="Fiverr URL" />
            <input className="terminal-input" value={content.services.freelancerLabel} onChange={(e) => setContent({ ...content, services: { ...content.services, freelancerLabel: e.target.value } })} placeholder="Freelancer button label" />
            <input className="terminal-input" value={content.services.freelancerUrl} onChange={(e) => setContent({ ...content, services: { ...content.services, freelancerUrl: e.target.value } })} placeholder="Freelancer URL" />
          </div>

          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2">Service</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {content.services.items.map((service) => (
                  <tr key={service.id} className="border-b border-white/5">
                    <td className="py-2">{service.title}</td>
                    <td className="py-2 flex gap-2">
                      <button onClick={() => editService(service)} className="px-2 py-1 rounded bg-white/10">Edit</button>
                      <button onClick={() => deleteService(service.id)} className="px-2 py-1 rounded bg-red-500/30">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <input className="terminal-input" placeholder="Service title" value={serviceDraft.title} onChange={(e) => setServiceDraft({ ...serviceDraft, title: e.target.value })} />
            <input className="terminal-input" placeholder="Accent color rgba/hex" value={serviceDraft.accent} onChange={(e) => setServiceDraft({ ...serviceDraft, accent: e.target.value })} />
            <textarea className="terminal-input md:col-span-2 min-h-24" placeholder="Service description" value={serviceDraft.description} onChange={(e) => setServiceDraft({ ...serviceDraft, description: e.target.value })} />
            <input className="terminal-input md:col-span-2" placeholder="Highlights (comma separated)" value={serviceDraft.highlights.join(', ')} onChange={(e) => setServiceDraft({ ...serviceDraft, highlights: e.target.value.split(',').map((h) => h.trim()).filter(Boolean) })} />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={saveService} className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">{selectedServiceId ? 'Update Service' : 'Add Service'}</button>
            <button onClick={() => { setSelectedServiceId(null); setServiceDraft(emptyService()); }} className="px-4 py-2 rounded-lg bg-white/10">Clear</button>
          </div>
        </section>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Skills (CRUD)</h2>
          <input
            className="terminal-input mb-3"
            value={content.skills.title}
            onChange={(e) => setContent({ ...content, skills: { ...content.skills, title: e.target.value } })}
            placeholder="Skills title"
          />
          <input
            className="terminal-input mb-4"
            value={content.skills.subtitle}
            onChange={(e) => setContent({ ...content, skills: { ...content.skills, subtitle: e.target.value } })}
            placeholder="Skills subtitle"
          />
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2">Skill</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {content.skills.items.map((skill, index) => (
                  <tr key={`${skill}-${index}`} className="border-b border-white/5">
                    <td className="py-2">{skill}</td>
                    <td className="py-2">
                      <button onClick={() => deleteSkill(index)} className="px-2 py-1 rounded bg-red-500/30">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-2">
            <input className="terminal-input" value={skillDraft} onChange={(e) => setSkillDraft(e.target.value)} placeholder="New skill name" />
            <button onClick={addSkill} className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">Add Skill</button>
          </div>
        </section>

        <section className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact + Socials</h2>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <input className="terminal-input" value={content.contact.title} onChange={(e) => setContent({ ...content, contact: { ...content.contact, title: e.target.value } })} placeholder="Contact title" />
            <input className="terminal-input" value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} placeholder="Email" />
            <input className="terminal-input md:col-span-2" value={content.contact.subtitle} onChange={(e) => setContent({ ...content, contact: { ...content.contact, subtitle: e.target.value } })} placeholder="Contact subtitle" />
            <input className="terminal-input md:col-span-2" value={content.contact.availability} onChange={(e) => setContent({ ...content, contact: { ...content.contact, availability: e.target.value } })} placeholder="Availability text" />
          </div>

          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2">Label</th>
                  <th className="py-2">URL</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {content.socials.map((s, i) => (
                  <tr key={`${s.label}-${i}`} className="border-b border-white/5">
                    <td className="py-2">{s.label}</td>
                    <td className="py-2 truncate">{s.href}</td>
                    <td className="py-2">
                      <button onClick={() => deleteSocial(i)} className="px-2 py-1 rounded bg-red-500/30">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr_auto] gap-2">
            <input className="terminal-input" value={socialDraft.label} onChange={(e) => setSocialDraft({ ...socialDraft, label: e.target.value })} placeholder="Label" />
            <input className="terminal-input" value={socialDraft.href} onChange={(e) => setSocialDraft({ ...socialDraft, href: e.target.value })} placeholder="URL" />
            <button onClick={addSocial} className="px-4 py-2 rounded-lg bg-neon-blue/20 border border-neon-blue/40">Add</button>
          </div>
        </section>

        <section className="glass rounded-2xl p-5">
          <h2 className="text-xl font-semibold mb-4">Footer</h2>
          <input className="terminal-input" value={content.footer.tagline} onChange={(e) => setContent({ ...content, footer: { ...content.footer, tagline: e.target.value } })} placeholder="Footer tagline" />
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
