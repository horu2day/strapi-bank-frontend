"use client"; // 클라이언트 컴포넌트로 지정

import styles from "../../../styles/AccountView.module.css";
import { useRouter, useParams } from "next/navigation";
import TransactionCard from "../../../components/TransactionCard/TransactionCard";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * 특정 계좌 상세 페이지 컴포넌트
 */
export default function AccountPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // URL에서 id 추출

  const [account, setAccount] = useState(null); // 계좌 정보 상태
  const [transactions, setTransactions] = useState([]); // 거래 내역 상태

  useEffect(() => {
    if (!id) return; // id가 없으면 실행하지 않음

    async function fetchData() {
      try {
        // 계좌 정보 조회
        const { data: accountData } = await axios.get(
          `http://localhost:1337/api/accounts/${id}`
        );

        // 모든 거래 내역 조회
        const { data: transactsData } = await axios.get(
          "http://localhost:1337/api/transacts"
        );

        // 현재 계좌와 관련된 거래만 필터링
        const filteredTransacts = transactsData.data.filter(
          (tD) =>
            tD.attributes.sender === accountData.data.attributes.name ||
            tD.attributes.receiver === accountData.data.attributes.name
        );

        setAccount(accountData.data); // 계좌 정보 설정
        setTransactions(filteredTransacts); // 거래 내역 설정
      } catch (error) {
        console.error("데이터 조회 중 오류 발생:", error);
      }
    }

    fetchData();
  }, [id]);

  /**
   * 계좌 삭제 함수
   */
  async function deleteAccount() {
    if (confirm("정말로 이 계좌를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:1337/api/accounts/${id}`);
        router.push("/"); // 메인 페이지로 이동
      } catch (error) {
        console.error("계좌 삭제 중 오류 발생:", error);
      }
    }
  }

  if (!account) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.accountViewContainer}>
      <div className={styles.accountViewMain}>
        <div className={styles.accountName}>
          <h1>{account.attributes.name}</h1>
        </div>
        <div className={styles.accountMiniDetails}>
          <div>
            <span style={{ marginRight: "4px", color: "#8e8e8e" }}>
              Balance($):
            </span>
            <span style={{ fontWeight: "600" }}>
              {account.attributes.balance}
            </span>
          </div>
          <div>
            <button onClick={deleteAccount} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
        <div className={styles.transactionsContainer}>
          <div className={styles.transactionsHeader}>
            <h2>Transactions</h2>
          </div>
          <div className={styles.transactionsList}>
            {!transactions || transactions.length === 0
              ? "No transactions yet."
              : transactions.map((transaction, i) => (
                  <TransactionCard key={i} transaction={transaction} />
                ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .deleteButton {
          padding: 8px 16px;
          background-color: #e11d48;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .deleteButton:hover {
          background-color: #be123c;
        }
      `}</style>
    </div>
  );
}
