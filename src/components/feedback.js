import React from 'react';
import styles from './feedback.module.css';
<<<<<<< HEAD

const FeedbackMessage = ({ messages, type, loading }) => {
  if (loading) {
    return (
      <div className={`${styles.feedbackContainer} ${styles.loading}`}>
        <p className={styles.feedbackMessage}>Carregando...</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) return null;

  return (
    <div className={`${styles.feedbackContainer} ${type === "success" ? styles.success : styles.error}`}>
      {messages.map((msg, index) => (
        <p key={index} className={styles.feedbackMessage}>
          {msg}
        </p>
      ))}
    </div>
  );
};

export default FeedbackMessage;
=======
const FeedbackMessage = ({ messages, type, loading }) => {
    if (loading) {
      return (
        <div className={`${styles.feedbackContainer} ${styles.loading}`}>
          <p className={styles.feedbackMessage}>Carregando...</p>
        </div>
      );
    }
  
    if (!messages || messages.length === 0) return null;
  
    return (
      <div className={`${styles.feedbackContainer} ${type === "success" ? styles.success : styles.error}`}>
        {messages.map((msg, index) => (
          <p key={index} className={styles.feedbackMessage}>
            {msg}
          </p>
        ))}
      </div>
    );
  };
  
  export default FeedbackMessage;
>>>>>>> ebca78f3438fae3b1cdd6d2b3ad72de18feaf210
