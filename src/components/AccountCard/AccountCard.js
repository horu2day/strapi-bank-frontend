// src/components/AccountCard/AccountCard.js

"use client"; // 클라이언트 컴포넌트로 지정

import styles from "./AccountCard.module.css";
import Link from "next/link";

/**
 * AccountCard 컴포넌트
 * @param {Object} props - 속성 객체
 * @param {Object} props.account - 계좌 정보
 */
export default function AccountCard({ account }) {
  // 데이터 확인을 위해 로깅
  console.log("AccountCard received account:", account);

  // account 객체의 필드가 존재하는지 확인
  if (!account) {
    return (
      <div className={styles.account}>
        <div className={styles.accountDetails}>
          <div className={styles.accountName}>
            <h3>Invalid Account Data</h3>
          </div>
        </div>
      </div>
    );
  }

  const { id, name, balance, createdAt } = account; // 계좌 정보 분해

  return (
    <Link href={`/account/${id}`}>
      <div className={styles.account}>
        <div className={styles.accountDetails}>
          <div className={styles.accountName}>
            <h3>
              <span style={{ fontWeight: "100" }}>Account: </span>
              {name}
            </h3>
          </div>
          <div className={styles.accountBalance}>
            <span>
              <span style={{ fontWeight: "100" }}>Balance($): </span>
              {balance}
            </span>
          </div>
          <div className={styles.accountCreatedAt}>
            <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
