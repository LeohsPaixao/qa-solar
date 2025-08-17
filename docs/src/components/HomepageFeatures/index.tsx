import type { ComponentProps, ComponentType, ReactNode } from 'react';

type FeatureItem = {
  title: string;
  Svg: ComponentType<ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Backend - NestJS',
    Svg: () => (
      <div style={{ 
        width: '200px', 
        height: '200px', 
        background: 'linear-gradient(135deg, #FF570A, #ff6b2b)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold'
      }}>
        🚀
      </div>
    ),
    description: (
      <>
        API robusta construída com <strong>NestJS</strong> e <strong>TypeScript</strong>, 
        conectada a um banco de dados <strong>PostgreSQL</strong> utilizando <strong>Prisma</strong> como ORM.
      </>
    ),
  },
  {
    title: 'Frontend - Vue 3',
    Svg: () => (
      <div style={{ 
        width: '200px', 
        height: '200px', 
        background: 'linear-gradient(135deg, #42b883, #35495e)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold'
      }}>
        ⚡
      </div>
    ),
    description: (
      <>
        Interface moderna construída com <strong>Vue 3</strong> e <strong>Composition API</strong>, 
        utilizando <strong>Vite</strong> para desenvolvimento rápido e eficiente.
      </>
    ),
  },
  {
    title: 'Testes Automatizados',
    Svg: () => (
      <div style={{ 
        width: '200px', 
        height: '200px', 
        background: 'linear-gradient(135deg, #00d4aa, #00b894)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold'
      }}>
        🧪
      </div>
    ),
    description: (
      <>
        Suíte completa de testes com <strong>Cypress</strong>, <strong> Playwright</strong>, 
        <strong> Robot Framework</strong> e <strong>K6</strong> para performance.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div style={{
      flex: '1',
      minWidth: '300px',
      maxWidth: '400px',
      textAlign: 'center',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <Svg role="img" aria-label={title} />
      </div>
      <div style={{ width: '100%' }}>
        <h3 style={{ 
          marginTop: '0', 
          marginBottom: '0.5rem',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          {title}
        </h3>
        <p style={{ 
          textAlign: 'center',
          maxWidth: '300px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      padding: '4rem 0',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
