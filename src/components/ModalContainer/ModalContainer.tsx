import Modal from 'react-modal';
import styles from './modalContainer.module.less';
import { ReactNode } from 'react';
interface IModal {
  modalIsOpen: boolean;
  closeModal: () => void;
  title: string;
  children?: ReactNode;
}

const ModalContainer = ({
  modalIsOpen,
  closeModal,
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
        <div className={styles.titleModal}>{title}</div>
        {children}
      </Modal>
    </>
  );
};

export default ModalContainer;
