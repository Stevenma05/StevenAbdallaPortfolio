'use client';

export default function Error({
  reset
}: {
  reset: () => void;
}) {
  return <main style={{
    padding: 50
  }}><h1>Connection interrupted.</h1><p>The world is still here. Try opening it again.</p><button className="primary-button" onClick={reset}>Reload experience</button></main>;
}
