"use client";

import { useState, useRef, useEffect } from 'react';
import { profile, track } from './content';
export default function Terminal({
  onNavigate
}: {
  onNavigate: (id: string) => void;
}) {
  const [lines, setLines] = useState(['STEVEN.EXE / interactive shell', 'Type help to see available commands.']),
    [value, setValue] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    bottom.current?.scrollIntoView({
      block: 'nearest'
    });
  }, [lines]);
  function run(e: React.FormEvent) {
    e.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) return;
    setHistory(h => [command, ...h]);
    setIndex(-1);
    setValue('');
    track('terminal', command);
    if (command === 'clear') {
      setLines([]);
      return;
    }
    let output = '';
    if (command === 'help') output = 'whoami · skills · projects · ai · experience · hackathons · github · linkedin · resume · contact · world · clear\nBonus: try “sudo make coffee”.';else if (command === 'whoami') output = 'Steven Abdalla. Computer Science developer, full-stack builder, and AI enthusiast. Based in Tampa, Florida.';else if (command === 'sudo make coffee') output = 'Permission granted. ☕ Curiosity refueled.';else if (command === 'linkedin') output = 'OPEN_LINKEDIN';else if (['skills', 'projects', 'ai', 'experience', 'hackathons', 'github', 'resume', 'contact', 'world'].includes(command)) {
      onNavigate(command);
      return;
    } else output = `Command not found: ${command}. Type help for the map.`;
    setLines(l => [...l.slice(-70), '> ' + command, output]);
  }
  return <div className="terminal-window"><div className="terminal-output" role="log" aria-live="polite">{lines.map((l, i) => l === 'OPEN_LINKEDIN' ? <a key={i} href={profile.linkedin} target="_blank" rel="noopener noreferrer">Open Steven’s LinkedIn ↗</a> : <p key={i} className={l.startsWith('>') ? 'terminal-command' : ''}>{l}</p>)}<div ref={bottom} /></div><form onSubmit={run}><label htmlFor="terminal-command">steven@world:~$</label><input id="terminal-command" autoFocus autoComplete="off" spellCheck={false} placeholder="help" value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const n = Math.min(index + 1, history.length - 1);
          setIndex(n);
          if (n >= 0) setValue(history[n]);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const n = Math.max(-1, index - 1);
          setIndex(n);
          setValue(n < 0 ? '' : history[n]);
        }
      }} /><button type="submit" aria-label="Run terminal command">↵</button></form><p className="footnote">A navigation shell. No code is executed on your device.</p></div>;
}
