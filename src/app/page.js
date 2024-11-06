// src/app/page.js

"use client"; // 클라이언트 컴포넌트로 지정

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import AccountCard from "../components/AccountCard/AccountCard";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionDialog from "../components/TransactionDialog/TransactionDialog";
import AddAccountDialog from "../components/AddAccountDialog/AddAccountDialog";

/**
 * 메인 페이지 컴포넌트
 */
export default function Home() {
  const [accounts, setAccounts] = useState([]); // 계좌 목록 상태
  const [showTransactModal, setShowTransactModal] = useState(false); // 송금 모달 표시 상태
  const [showAddAccountModal, setShowAddAccountModal] = useState(false); // 계좌 추가 모달 표시 상태

  useEffect(() => {
    async function fetchData() {
      try {
        // 모든 계좌 조회
        const { data } = await axios.get("http://localhost:1337/api/accounts");
        setAccounts(data.data); // 계좌 목록 설정
      } catch (error) {
        console.error("계좌 조회 중 오류 발생:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Bank Admin</title>
        <meta
          name="description"
          content="Strapi와 Next.js를 사용한 은행 관리 애플리케이션"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <div className={styles.breadcrumb}>
          <div>
            <button onClick={() => setShowTransactModal(true)}>Transact</button>
            <button onClick={() => setShowAddAccountModal(true)}>
              Add Account
            </button>
          </div>
        </div>
        <div className={styles.accountContainer}>
          <div className={styles.yourAccounts}>
            <h3>Accounts</h3>
          </div>
          <div>
            {accounts.map((account, i) => (
              <AccountCard key={i} account={account} />
            ))}
          </div>
        </div>
        {showAddAccountModal && (
          <AddAccountDialog closeModal={() => setShowAddAccountModal(false)} />
        )}
        {showTransactModal && (
          <TransactionDialog closeModal={() => setShowTransactModal(false)} />
        )}
      </main>

      <style jsx>{`
        button {
          padding: 10px 20px;
          margin-right: 10px;
          background-color: #1e3a8a;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
}
