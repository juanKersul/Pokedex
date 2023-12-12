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
  }, []);

  return (
    <IonContent>
      {data.map((item, index) => (
        <PokemonCard pokemon={item} index={index} />
      ))}
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          fetchData();
          setIndex(index + 1);
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
}
export default InfScroll;
