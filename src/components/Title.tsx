import React from 'react';
import { IonToolbar, IonTitle, IonHeader, IonLabel } from "@ionic/react";
const Title = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <IonLabel>Pokedex</IonLabel>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
export default Title;
