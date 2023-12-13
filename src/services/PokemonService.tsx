import { gql, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://beta.pokeapi.co/graphql/v1beta",
  }),
  cache: new InMemoryCache(),
});
const query = gql`
  query MyQuery($offset: Int!, $limit: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      base_experience
      height
      name
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  base_experience: number;
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: PokemonAbility[];
}

export interface PokemonData {
  name: string;
  sprite: string;
  exp: number;
  height: number;
  weight: number;
  abilities: string[];
}

const fetchPokemonData = async (offset: number, limit: number): Promise<PokemonData[]> => {
  const { data } = await client.query({
    query,
    variables: { offset, limit },
  });
  
  const pokemonDataList: PokemonData[] = data.pokemon_v2_pokemon.map((item: Pokemon) => ({
    name: item.name,
    sprite: JSON.parse(item.pokemon_v2_pokemonsprites[0].sprites).front_default,
    exp: item.base_experience,
    height: item.height,
    weight: item.weight,
    abilities: item.pokemon_v2_pokemonabilities.map(
      (sub: PokemonAbility) => sub.pokemon_v2_ability.name
    ),
  }));

  return pokemonDataList;
};

export default { fetchPokemonData };