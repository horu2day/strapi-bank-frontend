// src/components/Header/Header.js

"use client"; // 클라이언트 컴포넌트로 지정

import styles from "./Header.module.css";

/**
 * 헤더 컴포넌트
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerName}>Bank Admin</div>
    </header>
  );
}
