'use client';
import styles from './Header.module.css';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LogoutButton from './LogoutButton';


// ...
export default function Header({ initialUser }: { initialUser: any | null }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const user = initialUser;

  return (
    <header className="headerBar">
      <div className="container headerWrap">
        {/* Brand */}
        <a href="/" className="brandLink" aria-label="wercino">
          <span className="brandMark" aria-hidden>🐻</span>
          <span className="brandText">wercino</span>
        </a>

        {/* Nav */}
        <nav className="nav">
          <a className="navLink" href="/">Home</a>
          <a className="navLink" href="/services">Services</a>
          <a className="navLink" href="/pricing">Pricing</a>
          <a className="navLink" href="/faqs">FAQs</a>
          <a className="navLink" href="/testimonials">Testimonials</a>
          <a className="navLink" href="/dashboard">Dashboard</a>

          {user ? (
            <div className={styles.user}>
              <span className={styles.email}>{user.email}</span>
              <LogoutButton />
            </div>
          ) : (
            <>
              <button className="btn" onClick={() => setLoginOpen(true)}>Login</button>
              <button className="btn btnPrimary" onClick={() => setRegisterOpen(true)}>Sign up</button>
            </>
          )}
        </nav>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
}
