import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonTitle,
  IonCardContent,
} from "@ionic/react";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: {
    name: string;
    sprite: string;
    exp: number;
    height: number;
    weight: number;
    abilities: string[];
  };
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, index }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <IonCard key={index} onClick={handleFlip} color="warning" className="ion-card-fixed">
        <IonCardHeader>
          <IonTitle size="large">{pokemon.name.toUpperCase()}</IonTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg src={pokemon.sprite} alt={pokemon.name} />
        </IonCardContent>
      </IonCard>
      <IonCard onClick={handleFlip} className="ion-card-fixed">
        <IonCardHeader>
          <IonTitle size="large">{pokemon.name.toUpperCase()}</IonTitle>
        </IonCardHeader>
        <IonCardContent className="ion-card-text">
          <IonTitle size="small">Stats</IonTitle>
          <ul>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>Base Experience: {pokemon.exp}</li>
          </ul>
          <IonTitle size="small">Abilities:</IonTitle>
          <ul>
            {pokemon.abilities.map((item: any, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>
    </ReactCardFlip>
  );
};

export default PokemonCard;

