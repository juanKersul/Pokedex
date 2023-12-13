import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import PokemonCard from "./PokemonCard";

const fetchPokemonData = async (len: number) => {
  const promiseArr = [];
  for (let i = len; i < len + 20; i++) {
    promiseArr.push(
      (await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)).json()
    );
  }
  const resolvedData = await Promise.all(promiseArr);
  return resolvedData.map((item) => {
    return {
      name: item.name,
      sprite: item.sprites.front_default,
      exp: item.base_experience,
      height: item.height,
      weight: item.weight,
      abilities: item.abilities,
    };
  });
};

function InfScroll() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const fetchData = async () => {
    const resp = await fetchPokemonData(index);
    setData([...data, ...resp]);
  };
  useEffect(() => {
    fetchData();
    setIndex(index + 20);
  }, []);

  return (
    <IonContent>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {data.map((item, index) => (
          <PokemonCard
            key={index}
            pokemon={item}
            index={index}
          />
        ))}
      </div>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          fetchData();
          setIndex(index + 20);
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
}
export default InfScroll;
