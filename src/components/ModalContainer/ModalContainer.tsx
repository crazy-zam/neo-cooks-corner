import Modal from 'react-modal';
import styles from './modalContainer.module.less';
import { ReactNode } from 'react';
interface IModal {
  modalIsOpen: boolean;
  closeModal: () => void;
  children?: ReactNode;
}

const ModalContainer = ({ modalIsOpen, closeModal, children }: IModal) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalContainer;
