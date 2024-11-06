// src/app/account/[id]/page.js

import styles from "../../styles/AccountView.module.css";

export default async function AccountPage({ params }) {
  const { id } = params; // URL에서 id 추출

  // Strapi API를 통해 계좌 정보 조회
  const resAccount = await fetch(`http://localhost:1337/api/accounts/${id}`, {
    cache: "no-store",
  });
  if (!resAccount.ok) {
    return <div>Failed to load account data.</div>;
  }
  const accountData = await resAccount.json();

  // Strapi API를 통해 모든 거래 내역 조회
  const resTransacts = await fetch("http://localhost:1337/api/transacts", {
    cache: "no-store",
  });
  if (!resTransacts.ok) {
    return <div>Failed to load transactions data.</div>;
  }
  const transactsData = await resTransacts.json();

  // 현재 계좌와 관련된 거래만 필터링
  const accountName = accountData.attributes.name;
  const filteredTransacts = transactsData.data.filter(
    (tD) =>
      tD.attributes.sender === accountName ||
      tD.attributes.receiver === accountName
  );

  return (
    <div className={styles.accountViewContainer}>
      <div className={styles.accountViewMain}>
        <div className={styles.accountName}>
          <h1>{accountData.attributes.name}</h1>
        </div>
        <div className={styles.accountMiniDetails}>
          <div>
            <span style={{ marginRight: "4px", color: "#8e8e8e" }}>
              Balance($):
            </span>
            <span style={{ fontWeight: "600" }}>
              {accountData.attributes.balance}
            </span>
          </div>
          <div>
            <button
              onClick={async () => {
                if (confirm("정말로 이 계좌를 삭제하시겠습니까?")) {
                  try {
                    const resDelete = await fetch(
                      `http://localhost:1337/api/accounts/${id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (resDelete.ok) {
                      // 삭제 후 메인 페이지로 이동
                      window.location.href = "/";
                    } else {
                      alert("계좌 삭제에 실패했습니다.");
                    }
                  } catch (error) {
                    console.error("계좌 삭제 중 오류 발생:", error);
                    alert("계좌 삭제 중 오류가 발생했습니다.");
                  }
                }
              }}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
        <div className={styles.transactionsContainer}>
          <div className={styles.transactionsHeader}>
            <h2>Transactions</h2>
          </div>
          <div className={styles.transactionsList}>
            {filteredTransacts.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              filteredTransacts.map((transaction) => (
                <div key={transaction.id} className={styles.transactionCard}>
                  <p>
                    <strong>Sender:</strong> {transaction.attributes.sender}
                  </p>
                  <p>
                    <strong>Receiver:</strong> {transaction.attributes.receiver}
                  </p>
                  <p>
                    <strong>Amount($):</strong> {transaction.attributes.amount}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(
                      transaction.attributes.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            )}
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
