"use client";

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { ArrowUpRight, ArrowRight, VolumeX, Volume2, Compass, Brain, Flag, GitBranch, Orbit, Terminal as TerminalIcon, Trophy, Map, Pause, Play, Code2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Atlas } from './world/Atlas';
import { projects, sectorNames, track } from './world/content';
const Experiences = lazy(() => import('./world/Experiences'));
const Terminal = lazy(() => import('./world/Terminal'));
const allowed = ['home', 'world', 'projects', 'ai', 'experience', 'skills', 'about', 'contact', 'hackathons', 'github', 'resume', 'achievements', 'terminal', ...projects.map(p => 'project:' + p.id)];
export default function Home() {
  const [active, setActive] = useState('home'),
    [explored, setExplored] = useState<string[]>([]),
    [sound, setSound] = useState(false),
    [paused, setPaused] = useState(false),
    [boot, setBoot] = useState(false);
  const seen = useRef<string[]>([]),
    audio = useRef<AudioContext | null>(null),
    shell = useRef<HTMLDivElement>(null),
    cursor = useRef<HTMLDivElement>(null),
    returnFocus = useRef<HTMLElement | null>(null);
  const playSound = useCallback(() => {
    if (!sound) return;
    try {
      const ctx = audio.current || (audio.current = new AudioContext());
      if (ctx.state === 'suspended') void ctx.resume();
      const osc = ctx.createOscillator(),
        gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + .08);
      gain.gain.setValueAtTime(.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + .15);
    } catch {}
  }, [sound]);
  const navigate = useCallback((id: string) => {
    if (!allowed.includes(id)) id = 'home';
    if (active === 'home') returnFocus.current = document.activeElement as HTMLElement;
    setBoot(false);
    setActive(id);
    playSound();
    track('navigate', id);
    try {
      window.history.pushState(null, '', '#' + id);
    } catch {}
    const sector = id.startsWith('project:') ? 'projects' : id;
    if (sectorNames[sector] && !seen.current.includes(sector)) {
      seen.current = [...seen.current, sector];
      setExplored(seen.current);
      try {
        localStorage.setItem('steven-explored', JSON.stringify(seen.current));
      } catch {}
      if (seen.current.length === 1 || ['ai', 'hackathons'].includes(sector) || seen.current.length === 8) toast.success(seen.current.length === 8 ? 'World fully explored' : sectorNames[sector] + ' discovered', {
        description: 'Explorer badge unlocked',
        duration: 2400
      });
    }
  }, [active, playSound]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const saved = JSON.parse(localStorage.getItem('steven-explored') || '[]');
      if (Array.isArray(saved)) {
        seen.current = [...new Set(saved.filter((id): id is string => typeof id === 'string' && !!sectorNames[id]))];
        setExplored(seen.current);
      }
      if (!sessionStorage.getItem('steven-booted') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setBoot(true);
        sessionStorage.setItem('steven-booted', 'true');
        timer = setTimeout(() => setBoot(false), 1450);
      }
    } catch {}
    const restore = () => {
      let hash = '';
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {}
      setActive(allowed.includes(hash) ? hash : 'home');
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', restore);
      void audio.current?.close();
    };
  }, []);
  useEffect(() => {
    let code = '';
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate(active === 'terminal' ? 'home' : 'terminal');
        return;
      }
      if ((e.target as HTMLElement).matches('input,textarea,[contenteditable]')) return;
      code = (code + e.key + ',').slice(-85);
      if (code.endsWith('ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a,')) {
        toast.success('Secret route discovered', {
          description: 'Team player mode: unlocked. ⚽'
        });
        navigate('about');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate, active]);
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const move = (e: PointerEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${e.clientX + 14}px,${e.clientY + 16}px,0)`;
      cursor.current.classList.toggle('visible', !!(e.target as HTMLElement).closest('button,a') && !paused);
    };
    window.addEventListener('pointermove', move, {
      passive: true
    });
    return () => window.removeEventListener('pointermove', move);
  }, [paused]);
  const progress = Math.round(explored.length / 8 * 100);
  const name = active.startsWith('project:') ? projects.find(p => p.id === active.split(':')[1])?.name : sectorNames[active] || ({
    world: 'World map',
    resume: 'Résumé',
    achievements: 'Explorer badges',
    terminal: 'Command terminal'
  } as Record<string, string>)[active];
  return <div ref={shell} className={'app-shell ' + (paused ? 'motion-paused' : '')}><a className="skip-link" href="#main">Skip to experience</a><header className="topbar"><a href="#home" className="brand" onClick={e => {
        e.preventDefault();
        navigate('home');
      }}><Orbit size={27} /><span>STEVEN<span className="lime">.EXE</span></span></a><nav aria-label="Main navigation"><button className={active === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Overview</button><button onClick={() => navigate('world')}>Explore world</button><button onClick={() => navigate('projects')}>Projects</button><button onClick={() => navigate('ai')}>AI lab</button><button onClick={() => navigate('contact')}>Contact <ArrowUpRight size={13} /></button></nav><button className="resume-button" onClick={() => navigate('resume')}>Résumé <ArrowUpRight size={15} /></button></header><main id="main" tabIndex={-1}><section className="world-stage"><div className="coordinates mono"><span>01 / HOME BASE</span><span>27.9506° N &nbsp; 82.4572° W</span></div><div className="hero-copy"><div className="eyebrow"><span className="signal" /> COMPUTER SCIENCE · SOFTWARE · AI</div><h1>Steven<br />Abdalla<span className="lime">.</span></h1><p>I build software that turns<br /><span>ideas into experiences.</span></p><div className="hero-actions"><button className="primary-button" onClick={() => navigate('world')}>Enter my world <ArrowRight size={18} /></button><button className="text-button" onClick={() => navigate('about')}>Meet the builder <ArrowUpRight size={16} /></button></div><div className="hero-note mono"><span>BASED IN TAMPA, FL</span><span>BUILT ON CURIOSITY</span></div></div><Atlas onNavigate={navigate} explored={explored} /><div className="map-caption mono"><span><Compass size={14} /> CHOOSE A DESTINATION. FOLLOW YOUR CURIOSITY.</span><span>6 SECTORS + 2 SIDE QUESTS</span></div></section><section className="discovery"><div className="section-line"><span className="mono">SELECTED MISSIONS</span><button className="text-button" onClick={() => navigate('projects')}>All projects <ArrowUpRight size={15} /></button></div><div className="featured-grid">{[{
            id: 'glycotwin',
            n: '01',
            title: 'GlycoTwin',
            tag: 'AI + MOBILE',
            desc: 'A little more intelligence on your plate.',
            cls: 'green',
            icon: Brain
          }, {
            id: 'asl',
            n: '02',
            title: 'ASL Recognition',
            tag: 'MACHINE LEARNING',
            desc: 'Teaching a model to read the signs.',
            cls: 'blue',
            icon: GitBranch
          }, {
            id: 'canvamon',
            n: '03',
            title: 'CANVAMON',
            tag: 'HACKUSF',
            desc: 'Turn your assignments into a companion.',
            cls: 'orange',
            icon: Flag
          }].map(p => <button key={p.n} className={'featured-project ' + p.cls} onClick={() => navigate('project:' + p.id)}><span className="project-number mono">{p.n} / {p.tag}</span><p.icon className="project-symbol" size={45} strokeWidth={1} /><div><h2>{p.title}</h2><p>{p.desc}</p></div><ArrowUpRight className="project-arrow" size={21} /></button>)}</div></section><div className="side-quests"><span className="mono soft">OFF THE MAIN PATH</span><button className="text-button" onClick={() => navigate('hackathons')}>Hackathons / Competitions <ArrowUpRight size={14} /></button><button className="text-button" onClick={() => navigate('github')}>GitHub station <ArrowUpRight size={14} /></button></div></main><footer className="statusbar"><span className="mono"><span className="signal" /> ALL SYSTEMS CURIOUS</span><button className="exploration-progress" onClick={() => navigate('achievements')} aria-label={`View explorer badges, ${progress}% explored`}><span className="mono">WORLD EXPLORED <b>{progress}%</b></span><Progress value={progress} aria-label="World explored" /></button><button className="text-button mono" onClick={() => navigate('terminal')}><TerminalIcon size={15} /> OPEN TERMINAL <kbd>⌘ K</kbd></button><div className="system-controls"><button aria-label={paused ? 'Resume animation' : 'Pause animation'} aria-pressed={paused} className="icon-button" onClick={() => setPaused(v => !v)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button><button aria-label={sound ? 'Disable sound' : 'Enable sound'} aria-pressed={sound} className="icon-button" onClick={() => setSound(v => !v)}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}</button></div></footer><nav className="mobile-nav" aria-label="Mobile navigation"><button onClick={() => navigate('home')}><Orbit size={18} />Home</button><button onClick={() => navigate('world')}><Map size={18} />World</button><button onClick={() => navigate('projects')}><Code2 size={18} />Projects</button><button onClick={() => navigate('terminal')}><TerminalIcon size={18} />Terminal</button></nav><Dialog open={active !== 'home'} onOpenChange={open => {
      if (!open) navigate('home');
    }}><DialogContent className={'game-window ' + (active === 'terminal' ? 'terminal-dialog' : '')} onCloseAutoFocus={event => {
        event.preventDefault();
        returnFocus.current?.focus();
      }}><div className="window-header"><div><div className="mono soft">STEVEN.EXE / {active.startsWith('project:') ? 'PROJECT LAB' : 'EXPLORER'}</div><DialogTitle>{name}</DialogTitle></div><div className="window-actions"><button className="text-button" onClick={() => navigate('world')}><Map size={15} /> Map</button>{active !== 'resume' && <button className="text-button" onClick={() => navigate('resume')}>Résumé</button>}</div></div><DialogDescription className="sr-only">Explore Steven Abdalla’s {name}. Press Escape to return to the overview.</DialogDescription><div className={'window-body ' + (paused ? 'motion-paused' : '')} key={active}><Suspense fallback={<p className="loading-message" role="status">Opening destination…</p>}>{active === 'terminal' ? <Terminal onNavigate={navigate} /> : <Experiences active={active} onNavigate={navigate} explored={explored} />}</Suspense></div></DialogContent></Dialog>{boot && <div className="boot-screen"><Orbit size={40} /><span className="mono">STEVEN.EXE</span><p className="mono">INITIALIZING DEVELOPER PROFILE<span className="boot-caret">_</span></p><div className="boot-progress" /><button className="text-button" onClick={() => setBoot(false)}>Skip startup <ArrowRight size={15} /></button></div>}<div ref={cursor} aria-hidden="true" className="cursor-hint mono">OPEN ↗</div><Toaster theme="dark" position="bottom-right" toastOptions={{
      style: {
        background: '#172018',
        color: '#e8f3df',
        border: '1px solid #4b6141'
      }
    }} /></div>;
}
