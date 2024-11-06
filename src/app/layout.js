// src/app/layout/layout.js

import "../styles/globals.css";
import Head from "next/head";

/**
 * 레이아웃 컴포넌트
 * 모든 페이지에 공통된 레이아웃을 제공합니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 페이지 컴포넌트
 */
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
