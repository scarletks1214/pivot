import { WorkoutPlanCircuit } from 'models';
import React, { HTMLProps } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface ICircuitWizardModalProps extends HTMLProps<HTMLElement> {
  isOpen: boolean;
  onClose: (circuit: WorkoutPlanCircuit | undefined) => void;
}

export default (props: ICircuitWizardModalProps) => {
  const cancel = () => props.onClose(undefined);

  return (
    <Modal isOpen={props.isOpen} className={props.className} toggle={cancel}>
      <ModalHeader>New Circuit Wizard</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={cancel}>
          Cancel
        </Button>
        <Button color="primary">Create Circuit</Button>{' '}
      </ModalFooter>
    </Modal>
  );
};
