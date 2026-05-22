import { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, TrendingUp, Eye, GitFork, Star } from 'lucide-react';

interface RepoStats { name: string; stars: number; forks: number; watchers: number; updated: string }
interface ZenodoStats { total: number; latestTitle: string; latestDate: string }

const REPOS = [
  'cryptocreeper94-sudo/TrustGen-3D',
  'cryptocreeper94-sudo/TrustVault',
  'cryptocreeper94-sudo/TrustShield',
  'cryptocreeper94-sudo/Axiom-Studio',
  'cryptocreeper94-sudo/trust-layer-hub',
  'cryptocreeper94-sudo/lumeauto',
  'cryptocreeper94-sudo/lumescan',
];

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12, padding: 16,
};

export default function AnalyticsTab() {
  const [repos, setRepos] = useState<RepoStats[]>([]);
  const [zenodo, setZenodo] = useState<ZenodoStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);

    // GitHub repos
    const repoData: RepoStats[] = [];
    for (const r of REPOS) {
      try {
        const res = await fetch(`https://api.github.com/repos/${r}`);
        if (res.ok) {
          const d = await res.json();
          repoData.push({
            name: d.name,
            stars: d.stargazers_count || 0,
            forks: d.forks_count || 0,
            watchers: d.subscribers_count || 0,
            updated: d.pushed_at ? new Date(d.pushed_at).toLocaleDateString() : '—',
          });
        }
      } catch {}
    }
    setRepos(repoData);

    // Zenodo
    try {
      const zRes = await fetch('https://zenodo.org/api/records?q=DarkWave&size=1&sort=mostrecent');
      const zData = await zRes.json();
      setZenodo({
        total: zData?.hits?.total || 0,
        latestTitle: zData?.hits?.hits?.[0]?.metadata?.title || '—',
        latestDate: zData?.hits?.hits?.[0]?.metadata?.publication_date || '—',
      });
    } catch {}

    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const totalStars = repos.reduce((a, r) => a + r.stars, 0);
  const totalForks = repos.reduce((a, r) => a + r.forks, 0);
  const totalWatchers = repos.reduce((a, r) => a + r.watchers, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <BarChart3 size={18} style={{ color: '#8b5cf6' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Analytics</h2>
        <button onClick={fetchAll} disabled={loading} style={{
          marginLeft: 'auto', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 6, padding: '6px 12px', fontSize: 11, color: '#8b5cf6', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <RefreshCw size={12} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Research Papers', value: zenodo?.total ?? '—', color: '#06b6d4', icon: TrendingUp },
          { label: 'GitHub Stars', value: totalStars || '—', color: '#f59e0b', icon: Star },
          { label: 'Total Forks', value: totalForks || '—', color: '#10b981', icon: GitFork },
          { label: 'Watchers', value: totalWatchers || '—', color: '#8b5cf6', icon: Eye },
          { label: 'Active Repos', value: repos.length || '—', color: '#ec4899', icon: BarChart3 },
        ].map((s, i) => (
          <div key={i} style={{ ...card, textAlign: 'center', padding: '16px 12px' }}>
            <s.icon size={16} style={{ color: s.color, marginBottom: 6, opacity: 0.7 }} />
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'monospace', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Latest Paper */}
      {zenodo && (
        <div style={{ ...card, marginBottom: 16, borderColor: 'rgba(6,182,212,0.15)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Latest Publication
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{zenodo.latestTitle}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
            Published: {zenodo.latestDate} · {zenodo.total} total papers on Zenodo
          </div>
        </div>
      )}

      {/* Repo Activity */}
      <div style={card}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Repository Activity
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
            <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite', marginBottom: 8 }} />
            <p>Fetching GitHub data...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {repos.map((r, i) => (
              <a key={i} href={`https://github.com/${REPOS[i]}`} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', color: 'inherit',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>Last push: {r.updated}</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#f59e0b' }}>
                    <Star size={10} /> {r.stars}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#10b981' }}>
                    <GitFork size={10} /> {r.forks}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#8b5cf6' }}>
                    <Eye size={10} /> {r.watchers}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
