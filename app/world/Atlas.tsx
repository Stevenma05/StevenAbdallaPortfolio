"use client";

import { Brain, Code2, Flag, GitBranch, UserRound, Radio, ArrowUpRight, Orbit } from 'lucide-react';
export const destinations = [{
  id: 'projects',
  name: 'Project lab',
  label: '01 / THE BUILDS',
  icon: Code2,
  x: 25,
  y: 27
}, {
  id: 'ai',
  name: 'AI lab',
  label: '02 / INTELLIGENCE',
  icon: Brain,
  x: 69,
  y: 15
}, {
  id: 'experience',
  name: 'Mission log',
  label: '03 / THE JOURNEY',
  icon: Flag,
  x: 87,
  y: 52
}, {
  id: 'skills',
  name: 'Skill tree',
  label: '04 / THE TOOLKIT',
  icon: GitBranch,
  x: 62,
  y: 85
}, {
  id: 'about',
  name: 'The builder',
  label: '05 / PLAYER PROFILE',
  icon: UserRound,
  x: 12,
  y: 64
}, {
  id: 'contact',
  name: 'Comms',
  label: '06 / MAKE CONTACT',
  icon: Radio,
  x: 34,
  y: 91
}];
export function Atlas({
  onNavigate,
  explored
}: {
  onNavigate: (id: string) => void;
  explored: string[];
}) {
  return <div className="atlas" aria-label="Interactive portfolio destination map"><div className="map-topline mono"><span>STEVEN'S ORBIT</span><span>LIVE EXPLORATION <span className="small-cross">+</span></span></div><svg className="orbit-map" viewBox="0 0 600 600" fill="none" aria-hidden="true"><defs><radialGradient id="orbGlow"><stop stopColor="#c5ec75" stopOpacity=".16" /><stop offset="1" stopColor="#c5ec75" stopOpacity="0" /></radialGradient><linearGradient id="orbLine"><stop stopColor="#c5ec75" stopOpacity=".7" /><stop offset=".5" stopColor="#8aab82" stopOpacity=".08" /><stop offset="1" stopColor="#c5ec75" stopOpacity=".5" /></linearGradient></defs><circle cx="300" cy="300" r="230" fill="url(#orbGlow)" /><circle cx="300" cy="300" r="227" stroke="#688166" strokeOpacity=".14" strokeDasharray="2 8" /><circle cx="300" cy="300" r="162" stroke="#79916c" strokeOpacity=".15" /><g className="orbit-lines" stroke="url(#orbLine)" strokeWidth=".8"><ellipse cx="300" cy="300" rx="228" ry="118" transform="rotate(-35 300 300)" /><ellipse cx="300" cy="300" rx="228" ry="118" transform="rotate(35 300 300)" /><ellipse cx="300" cy="300" rx="228" ry="118" transform="rotate(90 300 300)" /></g>{destinations.map(d => <path key={d.id} d={`M300 300 L${d.x * 6} ${d.y * 6}`} stroke="#bfd5a4" strokeOpacity=".13" strokeDasharray="3 7" />)}<g className="satellites"><circle cx="84" cy="224" r="3" fill="#d0f49d" /><circle cx="516" cy="376" r="3" fill="#d0f49d" /><circle cx="300" cy="74" r="2" fill="#d0f49d" /></g><path d="M291 19h18M300 10v18M291 581h18M300 572v18M10 300h18M19 291v18M572 300h18M581 291v18" stroke="#50624c" /></svg><button className="core" aria-label="Open Steven's profile" onClick={() => onNavigate('about')}><div className="core-monogram">SA<span>_</span></div><span className="mono">PROFILE</span></button>{destinations.map(d => <button style={{
      left: d.x + '%',
      top: d.y + '%'
    }} key={d.id} className={'destination destination-' + d.id + (explored.includes(d.id) ? ' visited' : '')} onClick={() => onNavigate(d.id)}><span className="destination-icon"><d.icon size={21} strokeWidth={1.4} /></span><span className="destination-text"><span className="mono">{d.label}</span><strong>{d.name} <ArrowUpRight size={13} /></strong></span></button>)}</div>;
}
