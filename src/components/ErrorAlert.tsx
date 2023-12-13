import React from 'react';
import { IonAlert } from '@ionic/react';

interface ErrorAlertProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  errorMessage: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ isOpen, onDidDismiss, errorMessage }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      header={'Error'}
      message={errorMessage}
      buttons={['OK']}
    />
  );
};

export default ErrorAlert;


