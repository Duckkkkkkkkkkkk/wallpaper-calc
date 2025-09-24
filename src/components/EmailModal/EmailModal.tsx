import { useState, useEffect } from 'react';
import styles from './EmailModal.module.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  results: {
    rolls: number;
    wallpaperArea: number;
    wallArea: number;
  };
}

export function EmailModal({ isOpen, onClose, onSend, results }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');


  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setStatusMessage('');
      setStatusType('');
      setIsSending(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);
    setStatusMessage('');

    try {
      await onSend(email);
      setStatusMessage('Результаты успешно отправлены!');
      setStatusType('success');
      setEmail('');
      setTimeout(onClose, 1500);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setStatusMessage('Проверьте email и попробуйте снова.');
      setStatusType('error');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2 className={styles.title}>Поделитесь результатом</h2>

        <div className={styles.resultsPreview}>
          <h3>Результаты расчета:</h3>
          <div className={styles.valuesRow}>
            <div className={styles.valueBlock}>
              <p className={styles.value}>{results.rolls}</p>
              <span className={styles.label}>Кол-во рулонов</span>
            </div>
            <div className={styles.valueBlock}>
              <p className={styles.value}>{results.wallpaperArea} м²</p>
              <span className={styles.label}>Кол-во m2 обоев</span>
            </div>
            <div className={styles.valueBlock}>
              <p className={styles.value}>{results.wallArea} м²</p>
              <span className={styles.label}>Площадь оклейки</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email адрес</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={styles.input}
              required
            />
          </div>

          {statusMessage && (
            <div className={`${styles.statusMessage} ${statusType ? styles[statusType] : ''}`}>
              {statusMessage}
            </div>
          )}

          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Отмена
            </button>
            <button 
              type="submit" 
              disabled={isSending || !email.trim()}
              className={styles.sendButton}
            >
              {isSending ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
