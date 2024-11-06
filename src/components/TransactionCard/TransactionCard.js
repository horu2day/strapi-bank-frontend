// src/components/TransactionCard/TransactionCard.js

"use client"; // 클라이언트 컴포넌트로 지정

import styles from "./TransactionCard.module.css";

/**
 * TransactionCard 컴포넌트
 * @param {Object} props - 속성 객체
 * @param {Object} props.transaction - 거래 정보
 */
export default function TransactionCard({ transaction }) {
  const {
    attributes: { sender, receiver, amount, createdAt },
  } = transaction; // 거래 정보 분해

  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionDetails}>
        <div className={styles.transactionItem}>
          <h4>
            <span>Sender: </span>
            <span style={{ fontWeight: "bold" }}>{sender}</span>
          </h4>
        </div>
        <div className={styles.transactionItem}>
          <h4>
            <span>Receiver: </span>
            <span style={{ fontWeight: "bold" }}>{receiver}</span>
          </h4>
        </div>
        <div className={styles.transactionItem}>
          <h4>
            <span>Amount($): </span>
            <span style={{ fontWeight: "bold" }}>{amount}</span>
          </h4>
        </div>
        <div className={styles.transactionItem}>
          <h4>
            <span>Created At: </span>
            <span style={{ fontWeight: "bold" }}>
              {new Date(createdAt).toLocaleString()}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
