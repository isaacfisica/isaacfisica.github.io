"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
    return (
        <nav className="navbar">
            <Link href="/" className={`nav-link ${isHome ? 'active' : ''}`}>
                <span className="nav-link__icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="nav-link__text">홈</span>
            </Link>
            <Link href="/links" className={`nav-link ${pathname.startsWith('/links') ? 'active' : ''}`}>
                <span className="nav-link__icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="nav-link__text">링크</span>
            </Link> 
            <Link href="/about" className={`nav-link ${pathname.startsWith('/about') ? 'active' : ''}`}>
                <span className="nav-link__icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="nav-link__text">소개</span>
            </Link> 
            </nav>
    );
}   export default Navbar;