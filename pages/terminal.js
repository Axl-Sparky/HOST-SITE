import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Terminal() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/bot/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Bot Terminal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>V1.0.2</h1>
        <p>Bot Version</p>
        
        <div className="divider"></div>
        
        <section className="section">
          <h2>Bot Terminal</h2>
          
          <div className="terminal">
            {loading ? (
              <p>Loading messages...</p>
            ) : messages.length === 0 ? (
              <p>No messages yet</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="message">
                  <div className="message-header">
                    <span className="message-tag">[ MESSAGE ]</span>
                  </div>
                  <div className="message-content">
                    <p>Date: {new Date(msg.date).toString()}</p>
                    <p>{msg.body}</p>
                    <p>From: wp user {msg.from}</p>
                    <p>In: {msg.to}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <nav className="navigation">
          <Link href="/">
            <a className="nav-link">Back to Dashboard</a>
          </Link>
          <Link href="/dashboard">
            <a className="nav-link">Bot Statistics</a>
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
        
        .divider {
          width: 100%;
          height: 1px;
          background: #eaeaea;
          margin: 1rem 0;
        }
        
        .section {
          margin: 1rem 0;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          width: 100%;
        }
        
        .terminal {
          width: 100%;
          font-family: monospace;
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 5px;
          max-height: 500px;
          overflow-y: auto;
        }
        
        .message {
          margin-bottom: 1rem;
          border-bottom: 1px solid #ddd;
          padding-bottom: 1rem;
        }
        
        .message-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .message-tag {
          background: #0070f3;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
          font-size: 0.8rem;
        }
        
        .message-content {
          padding-left: 1rem;
        }
        
        .message-content p {
          margin: 0.2rem 0;
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
