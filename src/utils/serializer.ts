export type TSinglePokemon = {
  name: string;
  image: string;
  abilities: string[];
  moves: string[];
}

type Ability = {
  ability: {
    name: string
  }
}

type Move = {
  move: {
    name: string;
  }
}

export const serializePokemons = (pokemon: any): TSinglePokemon => ({
  name: pokemon.name,
  image: pokemon.sprites?.front_default,
  abilities: pokemon.abilities?.map((ability: Ability) => ability.ability?.name),
  moves: pokemon.moves?.map((move: Move) => move.move?.name).slice(0, 5)
})