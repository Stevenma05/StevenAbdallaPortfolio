import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://www.stevenabdalla.com'),
  alternates: {
    canonical: '/'
  },
  title: 'Steven Abdalla — Software Engineer & AI Builder | STEVEN.EXE',
  description: 'Explore Steven Abdalla’s digital world: full-stack software, mobile apps, applied machine learning, and the journey behind the builds.',
  keywords: ['Steven Abdalla', 'Software Engineer', 'Computer Science', 'AI Engineer', 'Machine Learning', 'Full Stack Developer'],
  openGraph: {
    title: 'STEVEN.EXE — Steven Abdalla',
    description: 'An interactive world of software, AI, and curiosity.',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'STEVEN.EXE — Steven Abdalla',
    description: 'Explore the projects and engineering journey of Steven Abdalla.'
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg'
  }
};
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Steven Abdalla',
          url: 'https://www.stevenabdalla.com',
          sameAs: ['https://github.com/Stevenma05', 'https://www.linkedin.com/in/steven-abdalla-2b0727309/'],
          knowsAbout: ['Computer Science', 'Software Engineering', 'Machine Learning', 'Full Stack Development'],
          email: 'mailto:stevenmarcos1010@gmail.com'
        })
      }} /></body></html>;
}
