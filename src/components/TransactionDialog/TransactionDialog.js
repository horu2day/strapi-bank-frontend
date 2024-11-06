// src/components/TransactionDialog/TransactionDialog.js

"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import axios from "axios";
import styles from "./TransactionDialog.module.css";

/**
 * TransactionDialog 컴포넌트
 * @param {Function} props.closeModal - 모달을 닫는 함수
 */
export default function TransactionDialog({ closeModal }) {
  const [disable, setDisable] = useState(false); // 버튼 비활성화 상태

  /**
   * 송금 함수
   * @param {Object} e - 이벤트 객체
   */
  async function transact(e) {
    e.preventDefault(); // 폼 기본 제출 방지
    setDisable(true); // 버튼 비활성화

    const sender = e.target.sender.value; // 입력된 발신자 이름
    const receiver = e.target.receiver.value; // 입력된 수신자 이름
    const amount = e.target.amount.value; // 입력된 송금 금액

    try {
      // Strapi의 /transfer 엔드포인트로 송금 요청
      await axios.post("http://localhost:1337/api/transfer", {
        data: { sender, receiver, amount },
      });

      setDisable(false); // 버튼 활성화
      closeModal(); // 모달 닫기
      location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("송금 중 오류 발생:", error);
      setDisable(false);
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackdrop} onClick={closeModal}></div>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Transaction</h3>
          <span className={styles.closeButton} onClick={closeModal}>
            X
          </span>
        </div>
        <form onSubmit={transact}>
          <div className={styles.modalBody}>
            <div className={styles.inputField}>
              <label htmlFor="sender">Sender</label>
              <input id="sender" name="sender" type="text" required />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="receiver">Receiver</label>
              <input id="receiver" name="receiver" type="text" required />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="amount">Amount($)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              disabled={disable}
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              disabled={disable}
              className={`${styles.button} ${styles.submitButton}`}
              type="submit"
            >
              Transact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
