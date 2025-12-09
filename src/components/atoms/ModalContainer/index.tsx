import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import style from "./index.module.scss";

const ModalContainer = (props: any) => {
  const { heading, children, show, onHide } = props;
  return (
    <div className={style.ModalContainer}>
      <Modal show={show} onHide={onHide} centered size="lg">
        <ModalHeader closeButton>
          <h4>{heading}</h4>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
};

export default ModalContainer;
