import { useEffect, useState } from 'react';
import './AdminPanel.css';

const cloneData = (value) => JSON.parse(JSON.stringify(value));
const splitByLine = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean);
const splitByComma = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

const AdminPanel = ({ data, onSave, onReset, onClose }) => {
  const [formData, setFormData] = useState(cloneData(data));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(cloneData(data));
  }, [data]);

  const updateSectionField = (section, field, value) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (section, item) => {
    setSaved(false);
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const removeArrayItem = (section, index) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateSkill = (groupIndex, skillIndex, field, value) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((group, gi) =>
        gi !== groupIndex
          ? group
          : {
              ...group,
              skills: group.skills.map((skill, si) =>
                si === skillIndex ? { ...skill, [field]: value } : skill
              ),
            }
      ),
    }));
  };

  const addSkillGroup = () => {
    addArrayItem('skills', { category: 'New Category', id: 'NEW-00', skills: [{ name: '', tip: '' }] });
  };

  const updateHeaderLink = (index, field, value) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        links: prev.header.links.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addHeaderLink = () => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        links: [...prev.header.links, { label: 'new', cmd: '--to=new', targetId: 'new' }],
      },
    }));
  };

  const removeHeaderLink = (index) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        links: prev.header.links.filter((_, i) => i !== index),
      },
    }));
  };

  const addSkillToGroup = (groupIndex) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((group, gi) =>
        gi === groupIndex
          ? { ...group, skills: [...group.skills, { name: '', tip: '' }] }
          : group
      ),
    }));
  };

  const removeSkillFromGroup = (groupIndex, skillIndex) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((group, gi) =>
        gi === groupIndex
          ? { ...group, skills: group.skills.filter((_, si) => si !== skillIndex) }
          : group
      ),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
  };

  return (
    <section className="admin section" id="admin">
      <div className="container">
        <div className="admin-header-row">
          <div>
            <div className="node-label">NODE-ADMIN :: CONTENT_EDITOR</div>
            <h2 className="section-title">Admin <span>Panel</span></h2>
            <p className="section-sub">All fields are editable (no JSON required)</p>
          </div>
          {onClose && <button className="btn btn-outline" onClick={onClose}>[X] close</button>}
        </div>

        <div className="admin-card terminal-card">
          <h3>Header</h3>
          <div className="admin-grid">
            <label>
              <span>Header Prompt</span>
              <input
                value={formData.header.prompt}
                onChange={(e) => updateSectionField('header', 'prompt', e.target.value)}
              />
            </label>
          </div>
          {formData.header.links.map((link, index) => (
            <div className="admin-item" key={`header-link-${index}`}>
              <label><span>Label</span><input value={link.label} onChange={(e) => updateHeaderLink(index, 'label', e.target.value)} /></label>
              <label><span>Command Text</span><input value={link.cmd} onChange={(e) => updateHeaderLink(index, 'cmd', e.target.value)} /></label>
              <label><span>Target Section ID</span><input value={link.targetId} onChange={(e) => updateHeaderLink(index, 'targetId', e.target.value)} /></label>
              <button className="btn btn-outline btn-sm" onClick={() => removeHeaderLink(index)}>Remove Link</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={addHeaderLink}>
            + Add Header Link
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Hero</h3>
          <div className="admin-grid">
            <label><span>Name</span><input value={formData.hero.name} onChange={(e) => updateSectionField('hero', 'name', e.target.value)} /></label>
            <label><span>Designation</span><input value={formData.hero.designation} onChange={(e) => updateSectionField('hero', 'designation', e.target.value)} /></label>
            <label><span>Status Text</span><input value={formData.hero.statusText} onChange={(e) => updateSectionField('hero', 'statusText', e.target.value)} /></label>
            <label><span>Primary Button Text</span><input value={formData.hero.primaryButtonText} onChange={(e) => updateSectionField('hero', 'primaryButtonText', e.target.value)} /></label>
            <label><span>Primary Button Target</span><input value={formData.hero.primaryButtonTarget} onChange={(e) => updateSectionField('hero', 'primaryButtonTarget', e.target.value)} /></label>
            <label><span>Secondary Button Text</span><input value={formData.hero.secondaryButtonText} onChange={(e) => updateSectionField('hero', 'secondaryButtonText', e.target.value)} /></label>
            <label><span>Secondary Button Target</span><input value={formData.hero.secondaryButtonTarget} onChange={(e) => updateSectionField('hero', 'secondaryButtonTarget', e.target.value)} /></label>
          </div>
          {formData.hero.socials.map((social, index) => (
            <div className="admin-item" key={`social-${index}`}>
              <label><span>Social Label</span><input value={social.label} onChange={(e) => {
                const next = formData.hero.socials.map((item, i) => i === index ? { ...item, label: e.target.value } : item);
                updateSectionField('hero', 'socials', next);
              }} /></label>
              <label><span>Social URL</span><input value={social.href} onChange={(e) => {
                const next = formData.hero.socials.map((item, i) => i === index ? { ...item, href: e.target.value } : item);
                updateSectionField('hero', 'socials', next);
              }} /></label>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => updateSectionField('hero', 'socials', [...formData.hero.socials, { label: '[NEW]', href: 'https://' }])}>
            + Add Social Link
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>About</h3>
          <div className="admin-grid">
            <label><span>Bio</span><textarea rows={4} value={formData.about.bio} onChange={(e) => updateSectionField('about', 'bio', e.target.value)} /></label>
            <label><span>Details</span><textarea rows={4} value={formData.about.details} onChange={(e) => updateSectionField('about', 'details', e.target.value)} /></label>
            <label><span>Degree</span><input value={formData.about.degree} onChange={(e) => updateSectionField('about', 'degree', e.target.value)} /></label>
            <label><span>Status</span><input value={formData.about.status} onChange={(e) => updateSectionField('about', 'status', e.target.value)} /></label>
            <label><span>Mode</span><input value={formData.about.mode} onChange={(e) => updateSectionField('about', 'mode', e.target.value)} /></label>
          </div>
        </div>

        <div className="admin-card terminal-card">
          <h3>Skills</h3>
          {formData.skills.map((group, groupIndex) => (
            <div className="admin-block" key={`group-${groupIndex}`}>
              <div className="admin-item">
                <label><span>Category</span><input value={group.category} onChange={(e) => updateArrayItem('skills', groupIndex, 'category', e.target.value)} /></label>
                <label><span>Group ID</span><input value={group.id} onChange={(e) => updateArrayItem('skills', groupIndex, 'id', e.target.value)} /></label>
                <button className="btn btn-outline btn-sm" onClick={() => removeArrayItem('skills', groupIndex)}>Remove Group</button>
              </div>
              {group.skills.map((skill, skillIndex) => (
                <div className="admin-item" key={`skill-${groupIndex}-${skillIndex}`}>
                  <label><span>Skill Name</span><input value={skill.name} onChange={(e) => updateSkill(groupIndex, skillIndex, 'name', e.target.value)} /></label>
                  <label><span>Tooltip</span><input value={skill.tip} onChange={(e) => updateSkill(groupIndex, skillIndex, 'tip', e.target.value)} /></label>
                  <button className="btn btn-outline btn-sm" onClick={() => removeSkillFromGroup(groupIndex, skillIndex)}>Remove Skill</button>
                </div>
              ))}
              <button className="btn btn-outline btn-sm" onClick={() => addSkillToGroup(groupIndex)}>+ Add Skill</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={addSkillGroup}>+ Add Skill Group</button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div className="admin-block" key={`project-${index}`}>
              <div className="admin-grid">
                <label><span>Title</span><input value={project.title} onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)} /></label>
                <label><span>Slug</span><input value={project.slug} onChange={(e) => updateArrayItem('projects', index, 'slug', e.target.value)} /></label>
                <label><span>Icon (emoji)</span><input value={project.icon} onChange={(e) => updateArrayItem('projects', index, 'icon', e.target.value)} /></label>
                <label><span>Project URL</span><input value={project.link} onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)} /></label>
                <label className="admin-full"><span>Description</span><textarea rows={3} value={project.desc} onChange={(e) => updateArrayItem('projects', index, 'desc', e.target.value)} /></label>
                <label className="admin-full"><span>Tags (comma separated)</span><input value={(project.tags || []).join(', ')} onChange={(e) => updateArrayItem('projects', index, 'tags', splitByComma(e.target.value))} /></label>
                <label className="admin-full"><span>Details (one per line)</span><textarea rows={4} value={(project.details || []).join('\n')} onChange={(e) => updateArrayItem('projects', index, 'details', splitByLine(e.target.value))} /></label>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => removeArrayItem('projects', index)}>Remove Project</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => addArrayItem('projects', { slug: 'new-project', title: 'New Project', desc: '', details: [], tags: [], icon: '✨', link: '#' })}>
            + Add Project
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Timeline</h3>
          {formData.timeline.map((item, index) => (
            <div className="admin-item" key={`timeline-${index}`}>
              <label><span>Year</span><input value={item.year} onChange={(e) => updateArrayItem('timeline', index, 'year', e.target.value)} /></label>
              <label><span>Title</span><input value={item.title} onChange={(e) => updateArrayItem('timeline', index, 'title', e.target.value)} /></label>
              <label><span>Organization</span><input value={item.organization} onChange={(e) => updateArrayItem('timeline', index, 'organization', e.target.value)} /></label>
              <label className="admin-full"><span>Summary</span><textarea rows={2} value={item.summary} onChange={(e) => updateArrayItem('timeline', index, 'summary', e.target.value)} /></label>
              <button className="btn btn-outline btn-sm" onClick={() => removeArrayItem('timeline', index)}>Remove Timeline Item</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => addArrayItem('timeline', { year: '2026', title: 'New Milestone', organization: 'Company', summary: 'Add milestone summary' })}>
            + Add Timeline Item
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Certifications</h3>
          {formData.certifications.map((cert, index) => (
            <div className="admin-item" key={`cert-${index}`}>
              <label><span>Name</span><input value={cert.name} onChange={(e) => updateArrayItem('certifications', index, 'name', e.target.value)} /></label>
              <label><span>Issuer</span><input value={cert.issuer} onChange={(e) => updateArrayItem('certifications', index, 'issuer', e.target.value)} /></label>
              <label><span>Year</span><input value={cert.year} onChange={(e) => updateArrayItem('certifications', index, 'year', e.target.value)} /></label>
              <label><span>Color</span><input value={cert.color} onChange={(e) => updateArrayItem('certifications', index, 'color', e.target.value)} /></label>
              <label><span>Icon Type</span>
                <select value={cert.iconName} onChange={(e) => updateArrayItem('certifications', index, 'iconName', e.target.value)}>
                  <option value="shield">shield</option>
                  <option value="cloud">cloud</option>
                  <option value="hack">hack</option>
                  <option value="linux">linux</option>
                  <option value="python">python</option>
                </select>
              </label>
              <label><span>Badge</span>
                <select value={cert.badge} onChange={(e) => updateArrayItem('certifications', index, 'badge', e.target.value)}>
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </label>
              <button className="btn btn-outline btn-sm" onClick={() => removeArrayItem('certifications', index)}>Remove Certification</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => addArrayItem('certifications', { name: 'New Certification', issuer: 'Issuer', year: '2026', iconName: 'shield', color: '#00bceb', badge: 'VERIFIED' })}>
            + Add Certification
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Contacts</h3>
          {formData.contacts.map((contact, index) => (
            <div className="admin-item" key={`contact-${index}`}>
              <label><span>Label</span><input value={contact.key} onChange={(e) => updateArrayItem('contacts', index, 'key', e.target.value)} /></label>
              <label><span>Value</span><input value={contact.val} onChange={(e) => updateArrayItem('contacts', index, 'val', e.target.value)} /></label>
              <label><span>Link (optional)</span><input value={contact.href || ''} onChange={(e) => updateArrayItem('contacts', index, 'href', e.target.value)} /></label>
              <label><span>Icon</span>
                <select value={contact.icon} onChange={(e) => updateArrayItem('contacts', index, 'icon', e.target.value)}>
                  <option value="mail">mail</option>
                  <option value="linkedin">linkedin</option>
                  <option value="github">github</option>
                  <option value="location">location</option>
                </select>
              </label>
              <button className="btn btn-outline btn-sm" onClick={() => removeArrayItem('contacts', index)}>Remove Contact</button>
            </div>
          ))}
          <button className="btn btn-outline btn-sm" onClick={() => addArrayItem('contacts', { icon: 'mail', key: 'NEW', val: '', href: '' })}>
            + Add Contact
          </button>
        </div>

        <div className="admin-card terminal-card">
          <h3>Footer</h3>
          <div className="admin-grid">
            <label><span>Year</span><input value={formData.footer.year} onChange={(e) => updateSectionField('footer', 'year', e.target.value)} /></label>
            <label><span>Name</span><input value={formData.footer.name} onChange={(e) => updateSectionField('footer', 'name', e.target.value)} /></label>
            <label><span>Designation</span><input value={formData.footer.designation} onChange={(e) => updateSectionField('footer', 'designation', e.target.value)} /></label>
            <label><span>Status</span><input value={formData.footer.status} onChange={(e) => updateSectionField('footer', 'status', e.target.value)} /></label>
          </div>
        </div>

        {saved && <div className="admin-msg success">Saved. All section content is updated.</div>}

        <div className="admin-actions">
          <button className="btn btn-primary" onClick={handleSave}>$ save --apply</button>
          <button className="btn btn-outline" onClick={onReset}>$ reset --defaults</button>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
