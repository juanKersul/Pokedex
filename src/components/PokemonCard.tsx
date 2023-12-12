import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
const PokemonCard = ({ pokemon, index }: any) => {
  return (
    <IonCard key={index}>
      <IonCardHeader className="ion-text-center">
        <IonCardTitle>{pokemon.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol size="4">
            <IonItem>
              <img src={pokemon.sprite} alt={pokemon.name} />
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem lines="none">
              <IonList className="ion-text-end" slot="end">
                <IonListHeader>
                  <h2>Stats</h2>
                </IonListHeader>
                <IonLabel>
                  <h2>Exp: {pokemon.exp}</h2>
                </IonLabel>
                <IonLabel>
                  <h2>Height: {pokemon.height}</h2>
                </IonLabel>
                <IonLabel>
                  <h2>Weight: {pokemon.weight}</h2>
                </IonLabel>
              </IonList>
            </IonItem>
          </IonCol>
          <IonCol size="4">
            <IonItem>
              <IonList className="ion-text-end">
                <IonListHeader>
                  <h2>Abilities</h2>
                </IonListHeader>
                {pokemon.abilities.map((ability: any, index: any) => (
                  <IonLabel key={index}>
                    <h2>{ability.ability.name}</h2>
                  </IonLabel>
                ))}
              </IonList>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};
export default PokemonCard;
