import Modal from 'react-modal';
import styles from './modalContainer.module.less';
import { ReactNode } from 'react';
import { CloseModal } from '@/assets';
interface IModal {
  modalIsOpen: boolean;
  closeModal: () => void;
  title: string;
  closeModalBtn: boolean;
  children?: ReactNode;
}

const ModalContainer = ({
  modalIsOpen,
  closeModal,
  closeModalBtn,
  children,
  title,
}: IModal) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {closeModalBtn && (
          <button className={styles.closeBtn} onClick={closeModal}>
            <CloseModal />
          </button>
        )}
        <div className={styles.titleModal}>{title}</div>
        {children}
      </Modal>
    </>
  );
};

export default ModalContainer;
