import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/bot/status');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>WhatsApp Bot Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Dashboard</h1>
        
        <section className="section">
          <h2>Pairing Code</h2>
          <div className="code-container">
            {loading ? (
              <p>Loading...</p>
            ) : status.qrCode ? (
              <img src={status.qrCode} alt="QR Code" className="qr-code" />
            ) : (
              <p>{status.pairingCode || 'Not available'}</p>
            )}
          </div>
        </section>

        <section className="section">
          <h2>Device Control</h2>
          <p>connected number: {status.connectedNumber || 'Not connected'}</p>
          <button className="logout-button">Logout</button>
        </section>

        <nav className="navigation">
          <Link href="/dashboard">
            <a className="nav-link">Bot Statistics</a>
          </Link>
          <Link href="/terminal">
            <a className="nav-link">Bot Terminal</a>
          </Link>
        </nav>
      </main>

      <footer>
        <p>Developer Information</p>
      </footer>

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
        
        .code-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }
        
        .qr-code {
          max-width: 200px;
          height: auto;
        }
        
        .logout-button {
          padding: 0.5rem 1rem;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
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
        
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
  }
