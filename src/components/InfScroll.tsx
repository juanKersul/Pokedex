import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import PokemonService from "../services/PokemonService";
import { PokemonData } from "../services/PokemonService";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import ErrorAlert from "./ErrorAlert";

function InfScroll() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    console.log("fetching data");
    const resp = await PokemonService.fetchPokemonData(index, 20);
    setData((prevData) => [...prevData, ...resp]);
  };

  useEffect(() => {
    fetchData();
    setIndex(index + 20);
  }, []); // Agrega dependencia vacía para ejecutar useEffect solo una vez

  return (
    <IonContent>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          fetchData();
          setIndex(index + 20);
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2vh 2vw",
            }}
          >
            {data.map((item, dataIndex) => (
              <PokemonCard key={dataIndex} pokemon={item} index={dataIndex} />
            ))}
          </div>
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>

      {error && (
        <ErrorAlert
          isOpen={error}
          errorMessage="Sorry, something gone wrong"
          onDidDismiss={() => setError(false)}
        />
      )}
    </IonContent>
  );
}

export default InfScroll;
