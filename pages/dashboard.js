import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/bot/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Bot Statistics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>WhatsApp Bot Dashboard</h1>
        
        <section className="section">
          <h2>Bot Statistics</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.totalCommands || 0}</h3>
                <p>total commands</p>
              </div>
              
              <div className="stat-card">
                <h3>{stats.runTrials || 0}</h3>
                <p>Run Trials</p>
              </div>
              
              <div className="stat-card">
                <h3>{stats.remainingQuota || 'N/A'}</h3>
                <p>Remaining Quota</p>
              </div>
            </div>
          )}
        </section>

        <nav className="navigation">
          <Link href="/">
            <a className="nav-link">Back to Dashboard</a>
          </Link>
          <Link href="/terminal">
            <a className="nav-link">Bot Terminal</a>
          </Link>
        </nav>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          width: 100%;
        }
        
        .section {
          margin: 1rem 0;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          width: 100%;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
        }
        
        .stat-card {
          padding: 1rem;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          text-align: center;
        }
        
        .stat-card h3 {
          font-size: 2rem;
          margin: 0.5rem 0;
        }
        
        .navigation {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin: 2rem 0;
        }
        
        .nav-link {
          padding: 0.5rem 1rem;
          background: #0070f3;
          color: white;
          border-radius: 5px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
            }
