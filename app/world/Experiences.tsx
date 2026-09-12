"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Brain, Check, Code2, Download, Flag, GitBranch, GitFork, Mail, Radio, RotateCcw, Trophy, UserRound, ExternalLink, Copy, Play } from 'lucide-react';
import { toast } from 'sonner';
import { projects, missions, skillBranches, profile, sectorNames, track, type Project } from './content';
import { Atlas } from './Atlas';
type Props = {
  active: string;
  onNavigate: (id: string) => void;
  explored: string[];
};
export function External({
  href,
  children,
  label,
  className = 'outline-button'
}: {
  href: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track('external_link', label || href)}>{children}<ArrowUpRight size={16} /></a>;
}
function Pipeline({
  project
}: {
  project: Project;
}) {
  const [step, setStep] = useState(0);
  return <div className={'pipeline ' + project.color}><div className="section-line"><span className="mono">SYSTEM ARCHITECTURE</span><span className="mono soft">SELECT A NODE</span></div><div className="flow-track">{project.flow.map((s, i) => <div className="flow-item" key={s.name}><button aria-pressed={step === i} onClick={() => setStep(i)} className={'flow-node ' + (step === i ? 'selected' : '')}><span className="mono">0{i + 1}</span><strong>{s.name}</strong></button>{i < project.flow.length - 1 && <ArrowRight size={19} className="flow-arrow" />}</div>)}</div><p className="flow-description" aria-live="polite"><span className="lime mono">0{step + 1}</span>{project.flow[step].detail}</p></div>;
}
function ProjectExperience({
  project,
  onNavigate
}: {
  project: Project;
  onNavigate: (id: string) => void;
}) {
  return <article className={'project-experience ' + project.color}><div className="eyebrow">{project.kicker}</div><h3 className="experience-headline">{project.tagline}</h3><p className="lede">{project.summary}</p><div className="link-row">{project.repo && <External href={profile.github + '/' + project.repo} label={project.id + ' github'}><GitFork size={17} /> Source code</External>}{project.demo && <External href={project.demo} label={project.id + ' demo'}><Play size={16} />{project.demoLabel}</External>}</div>{project.gallery && <section className="project-gallery" aria-label="Project photos">{project.gallery.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><figcaption>{photo.caption}</figcaption></figure>)}</section>}<div className="project-overview"><div><span className="mono soft">THE PROBLEM</span><p>{project.problem}</p></div><div><span className="mono soft">TOOLKIT</span><p className="stack-list">{project.stack.join(' / ')}</p></div></div><Pipeline key={project.id} project={project} /><div className="detail-columns"><section><h4>What it does</h4><ul className="feature-list">{project.features.map(f => <li key={f}><Check size={16} />{f}</li>)}</ul></section><section><h4>The engineering challenge</h4><p>{project.challenge}</p></section></div><section className="result-box"><span className="mono">OUTCOME & CONTEXT</span><p>{project.result}</p></section>{project.image && <figure className="project-evidence"><img src={project.image} alt={project.imageAlt} width={1200} height={500} loading="lazy" /><figcaption>Training artifact from the public project repository.</figcaption></figure>}<div className="end-navigation"><button className="text-button" onClick={() => onNavigate('projects')}>← Back to project lab</button><button className="text-button" onClick={() => onNavigate('project:' + projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length].id)}>Next project <ArrowRight size={16} /></button></div></article>;
}
function ProjectLab({
  onNavigate,
  filter
}: {
  onNavigate: (id: string) => void;
  filter?: string;
}) {
  const list = filter === 'ai' ? projects.filter(p => ['glycotwin', 'asl', 'diabetes'].includes(p.id)) : projects;
  return <><div className="eyebrow">{filter === 'ai' ? 'APPLIED INTELLIGENCE' : 'IDEAS → SYSTEMS → EXPERIENCES'}</div><h3 className="experience-headline">{filter === 'ai' ? <>Curiosity,<br />trained on data.</> : <>Built to solve.<br />Made to explore.</>}</h3><p className="lede">{filter === 'ai' ? 'Computer vision, transfer learning and AI-powered applications. Follow the data through each build.' : 'From an intelligent mobile app to a real-time system. Choose a build and step inside.'}</p>{filter === 'ai' && <div className="model-summary"><Brain size={34} /><div><b>Different problems. Different kinds of intelligence.</b><p>ASL uses a trained classifier. GlycoTwin uses Gemini for vision and explicit rules for wellness scoring.</p></div></div>}<div className="project-index">{list.map((p, i) => <button key={p.id} className={'project-index-entry ' + p.color} onClick={() => onNavigate('project:' + p.id)}><span className="mono index-number">0{i + 1}</span><div><span className="mono soft">{p.kicker}</span><h4>{p.name}</h4><p>{p.summary}</p></div><div className="project-tech mono">{p.stack.slice(0, 3).join(' / ')}</div><ArrowUpRight size={25} /></button>)}</div></>;
}
function SkillTree({
  onNavigate
}: Pick<Props, 'onNavigate'>) {
  const [selected, setSelected] = useState(skillBranches[0].skills[0]);
  return <><div className="eyebrow">KNOWLEDGE, CONNECTED</div><h3 className="experience-headline">How the<br />pieces connect.</h3><p className="lede">Select a skill to see where it becomes working software.</p><div className="skill-root"><GitBranch size={20} /><span>SOFTWARE ENGINEERING</span></div><div className="skill-branches">{skillBranches.map(b => <section key={b.name}><h4>{b.name}</h4>{b.skills.map(s => <button key={s.name} className={'skill-node ' + (selected.name === s.name ? 'selected' : '')} onClick={() => setSelected(s)} aria-pressed={selected.name === s.name}><span className="node-dot" />{s.name}<ArrowUpRight size={13} /></button>)}</section>)}</div><section className="skill-inspector" aria-live="polite"><div><span className="mono soft">SELECTED NODE</span><h4>{selected.name}</h4><p>{selected.detail}</p></div><div><span className="mono soft">SEE IT IN PRACTICE</span>{selected.used.length ? selected.used.map(id => <button key={id} className="text-button" onClick={() => onNavigate('project:' + id)}>{projects.find(p => p.id === id)?.name}<ArrowUpRight size={14} /></button>) : <p>Résumé-listed foundation.</p>}</div></section></>;
}
function ExperienceMission() {
  const [selected, setSelected] = useState(2);
  const m = missions[selected];
  return <><div className="eyebrow">EVERY CHAPTER ADDS SOMETHING</div><h3 className="experience-headline">The journey<br />behind the builds.</h3><div className="timeline-selector" aria-label="Career milestones">{missions.map((m, i) => <button key={m.year} onClick={() => setSelected(i)} aria-pressed={selected === i} className={selected === i ? 'selected' : ''}><span className="timeline-dot" /><b>{m.year}</b><span>{m.role}</span></button>)}</div><article className="mission-card" key={m.year}><div className="section-line"><span className="mono">MISSION 0{selected + 1} / {m.date}</span><span className="mission-status mono">{m.status}</span></div><h4>{m.title}</h4><h5>{m.role}</h5><p className="org">{m.org}</p><p>{m.body}</p><ul className="feature-list">{m.details.map(d => <li key={d}><Check size={16} />{d}</li>)}</ul><div className="mission-toolkit mono">{m.stack}</div></article><section className="education-strip"><div><span className="mono soft">ACADEMIC FOUNDATION</span><h4>University of South Florida</h4><p>Computer Science · Tampa, Florida</p></div><div><b>M.S. Computer Science</b><p>Expected May 2027</p><b>B.S. Computer Science</b><p>Expected May 2026 in the public résumé · GPA 3.77</p></div></section></>;
}
function About({
  onNavigate
}: Pick<Props, 'onNavigate'>) {
  return <div className="profile-layout"><div className="profile-photo"><img src="/steven.jpg" alt="Steven Abdalla" width={800} height={1067} /><div className="photo-caption mono">PLAYER 01 / STEVEN ABDALLA</div></div><div><div className="eyebrow">THE HUMAN AT THE CORE</div><h3 className="experience-headline">Builder.<br />Learner.<br />Team player.</h3><p className="lede">I’m Steven, a Computer Science developer drawn to full-stack systems, machine learning, and the space where useful software becomes a great experience.</p><dl className="player-stats"><div><dt>BASED IN</dt><dd>Tampa, Florida</dd></div><div><dt>FOCUS</dt><dd>Software engineering · AI · Mobile</dd></div><div><dt>UNIVERSITY</dt><dd>University of South Florida</dd></div><div><dt>CURRENT OBJECTIVE</dt><dd>Build intelligent software. Keep learning.</dd></div></dl><p className="human-note">Before software, there was soccer. I played professionally for my age group in Dubai. Teamwork still shapes how I build.</p><button className="primary-button" onClick={() => onNavigate('contact')}>Let’s build something <ArrowUpRight size={17} /></button></div></div>;
}
function Hackathons({
  onNavigate
}: Pick<Props, 'onNavigate'>) {
  return <>
    <div className="eyebrow">IDEAS UNDER PRESSURE</div>
    <h3 className="experience-headline">Small windows.<br />Ambitious builds.</h3>
    <p className="lede">From hackathon prototypes to a first-place finish on the robotics pitch.</p>
    <article className="hackathon-card green">
      <span className="mono">HACKABULL / 2026</span>
      <div className="hackathon-title"><Brain size={40} /><h4>GlycoTwin</h4></div>
      <p>Personalized food suggestions from menu photos, nutrition data and daily context.</p>
      <button className="primary-button" onClick={() => onNavigate('project:glycotwin')}>Explore the mission <ArrowRight size={16} /></button>
    </article>
    <article className="hackathon-card blue">
      <span className="mono">USF E-COUNCIL / MARCH 2026</span>
      <div className="hackathon-title"><Trophy size={40} /><h4>Soccer Robotics</h4></div>
      <div className="competition-award"><Trophy size={17} /><strong>1st Place</strong><span>Awarded by the Dean of Engineering</span></div>
      <p>A soccer-playing robot that combines hardware design, control logic, and real-time decision making to compete on a miniature pitch.</p>
      <div className="challenge-grid">
        <div><span className="mono soft">CHALLENGE</span><p>Bring hardware and software together to maneuver, control the ball, and respond during live play.</p></div>
        <div><span className="mono soft">THE BUILD</span><p>A wheeled robot with onboard electronics and a handheld controller, built for the Soccer Robotics Competition.</p></div>
      </div>
      <button className="primary-button" onClick={() => onNavigate('project:robotics')}>Explore the mission <ArrowRight size={16} /></button>
    </article>
    <article className="hackathon-card orange">
      <span className="mono">HACKUSF / 2026</span>
      <div className="hackathon-title"><Flag size={40} /><h4>CANVAMON</h4></div>
      <p>Turn Canvas assignment progress into a virtual pet experience across an extension and a mobile app.</p>
      <div className="challenge-grid"><div><span className="mono soft">CHALLENGE</span><p>Make assignment management motivating.</p></div><div><span className="mono soft">THE BUILD</span><p>Animated companions, a shared sync backend, schedules and local reminders.</p></div></div>
      <button className="primary-button" onClick={() => onNavigate('project:canvamon')}>Explore the mission <ArrowRight size={16} /></button>
    </article>
  </>;
}
function GitHubStation() {
  type Repo = {
    name: string;
    html_url: string;
    language: string | null;
    updated_at: string;
  };
  const [repos, setRepos] = useState<Repo[] | null>(null),
    [status, setStatus] = useState('Loading public repositories…');
  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    fetch('https://api.github.com/users/Stevenma05/repos?per_page=100&sort=updated', {
      signal: ctrl.signal
    }).then(r => {
      if (!r.ok) throw Error();
      return r.json();
    }).then((data: unknown) => {
      if (!Array.isArray(data)) throw Error();
      const rows = data.filter((r): r is Repo => !!r && typeof r === 'object' && typeof r.name === 'string' && typeof r.html_url === 'string' && r.html_url.startsWith(profile.github + '/') && typeof r.updated_at === 'string' && (typeof r.language === 'string' || r.language === null));
      setRepos(rows);
      setStatus('Live public GitHub snapshot');
    }).catch(() => setStatus('GitHub is unavailable. Featured repositories are ready below.')).finally(() => clearTimeout(timer));
    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, []);
  return <><div className="eyebrow">OPEN CODE. OPEN CURIOSITY.</div><h3 className="experience-headline">The work<br />continues here.</h3><div className="github-header"><GitFork size={45} /><div><h4>Stevenma05</h4><p aria-live="polite">{status}</p></div><External href={profile.github}>GitHub profile</External></div>{repos && <div className="github-stats"><div><b>{repos.length}</b><span>Public repositories</span></div><div><b>{new Set(repos.map(r => r.language).filter(Boolean)).size}</b><span>Primary languages</span></div><div><b>{repos[0] ? new Date(repos[0].updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }) : '—'}</b><span>Latest repository update</span></div></div>}<div className="repo-list">{(repos || projects.filter(p => p.repo).map(p => ({
        name: p.repo!,
        html_url: profile.github + '/' + p.repo,
        language: p.stack[0],
        updated_at: ''
      }))).map(r => <External key={r.name} href={r.html_url} className="repo-link"><Code2 size={17} /><span>{r.name}</span><small>{r.language || 'Repository'}</small></External>)}</div><p className="footnote">Public metadata only. The portfolio’s project content remains available if GitHub is offline.</p></>;
}
function Contact({
  onNavigate
}: Pick<Props, 'onNavigate'>) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success('Email address copied');
      track('contact', 'copy_email');
    } catch {
      toast.error('Could not copy. Use the email link below.');
    }
  };
  return <div className="contact-experience"><Radio size={44} strokeWidth={1} /><div className="eyebrow">COMMUNICATION TERMINAL</div><h3 className="experience-headline">Want to build<br />something interesting?</h3><p className="lede">A project, an opportunity, or an idea worth exploring.<br />Let’s start a conversation.</p><a className="email-link" href={'mailto:' + profile.email} onClick={() => track('contact', 'email')}>{profile.email}<ArrowUpRight size={26} /></a><button className="text-button" onClick={copy}><Copy size={15} /> Copy address</button><div className="contact-links"><External href={profile.linkedin}>LinkedIn</External><External href={profile.github}>GitHub</External><button className="outline-button" onClick={() => onNavigate('resume')}>Résumé<ArrowRight size={16} /></button></div><div className="contact-signature mono">STEVEN ABDALLA / TAMPA, FLORIDA</div></div>;
}
function Resume() {
  return <><p className="lede">The résumé linked on Steven’s public portfolio.</p><div className="link-row"><a href={profile.resume} download="Steven-Abdalla-Resume.pdf" className="primary-button" onClick={() => track('resume', 'download')}><Download size={17} />Download résumé</a><External href={profile.resume}>Open in a new tab</External></div><object className="resume-preview" data={profile.resume} type="application/pdf" aria-label="Steven Abdalla résumé preview"><p>Your browser cannot display PDF previews. <a href={profile.resume}>Open the résumé</a>.</p></object></>;
}
function Achievements({
  explored
}: Pick<Props, 'explored'>) {
  return <><div className="eyebrow">YOUR EXPLORATION LOG</div><h3 className="experience-headline">Curiosity<br />looks good on you.</h3><p className="lede">These badges celebrate your journey through this portfolio.</p><div className="badges-grid">{Object.entries(sectorNames).map(([id, name]) => <div key={id} className={'badge-card ' + (explored.includes(id) ? 'unlocked' : '')}><Trophy size={25} /><span className="mono">{explored.includes(id) ? 'DISCOVERED' : 'UNEXPLORED'}</span><h4>{name}</h4></div>)}</div><p className="footnote">Progress is saved on this device only.</p></>;
}
export default function Experiences(props: Props) {
  const {
    active,
    onNavigate,
    explored
  } = props;
  if (active.startsWith('project:')) {
    const p = projects.find(p => p.id === active.split(':')[1]);
    return p ? <ProjectExperience project={p} onNavigate={onNavigate} /> : <ProjectLab onNavigate={onNavigate} />;
  }
  ;
  switch (active) {
    case 'projects':
      return <ProjectLab onNavigate={onNavigate} />;
    case 'ai':
      return <ProjectLab onNavigate={onNavigate} filter="ai" />;
    case 'skills':
      return <SkillTree onNavigate={onNavigate} />;
    case 'experience':
      return <ExperienceMission />;
    case 'about':
      return <About onNavigate={onNavigate} />;
    case 'hackathons':
      return <Hackathons onNavigate={onNavigate} />;
    case 'github':
      return <GitHubStation />;
    case 'contact':
      return <Contact onNavigate={onNavigate} />;
    case 'resume':
      return <Resume />;
    case 'achievements':
      return <Achievements explored={explored} />;
    default:
      return <><div className="eyebrow">CHOOSE YOUR NEXT DESTINATION</div><div className="world-selector"><Atlas onNavigate={onNavigate} explored={explored} /><div className="world-directory">{Object.entries(sectorNames).map(([id, name], i) => <button key={id} onClick={() => onNavigate(id)}><span className="mono">0{i + 1}</span>{name}<ArrowUpRight size={17} /></button>)}</div></div></>;
  }
}
