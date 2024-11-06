// src/components/AddAccountDialog/AddAccountDialog.js

"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import axios from "axios";
import styles from "./AddAccountDialog.module.css";

/**
 * AddAccountDialog 컴포넌트
 * @param {Function} props.closeModal - 모달을 닫는 함수
 */
export default function AddAccountDialog({ closeModal }) {
  const [disable, setDisable] = useState(false); // 버튼 비활성화 상태

  /**
   * 계좌 추가 함수
   * @param {Object} e - 이벤트 객체
   */
  async function addAccount(e) {
    e.preventDefault(); // 폼 기본 제출 방지
    setDisable(true); // 버튼 비활성화

    const accountName = e.target.accountName.value; // 입력된 계좌 이름
    const accountBalance = e.target.accountBalance.value; // 입력된 잔액

    try {
      // Strapi API를 통해 새로운 계좌 생성
      await axios.post("http://localhost:1337/api/accounts", {
        data: {
          name: accountName,
          balance: parseFloat(accountBalance),
        },
      });

      setDisable(false); // 버튼 활성화
      closeModal(); // 모달 닫기
      location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("계좌 추가 중 오류 발생:", error);
      setDisable(false);
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackdrop} onClick={closeModal}></div>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Add New Account</h3>
          <span className={styles.closeButton} onClick={closeModal}>
            X
          </span>
        </div>
        <form onSubmit={addAccount}>
          <div className={styles.modalBody}>
            <div className={styles.inputField}>
              <label htmlFor="accountName">Name</label>
              <input id="accountName" name="accountName" type="text" required />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="accountBalance">Balance($):</label>
              <input
                id="accountBalance"
                name="accountBalance"
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
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
