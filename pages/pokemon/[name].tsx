import Image from 'next/image'
import { Box, Button, Typography } from "@mui/material";
import Link from 'next/link'
import { serializePokemons } from "../../src/utils/serializer";
import type { TSinglePokemon } from "../../src/utils/serializer";

type PokemonList = {
  name: string;
  url: string;
}

export const getStaticProps = async ({ params }: { params: PokemonList }) => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`
  const request = await fetch(API_URL)
  const pokemonJson = await request.json()
  const singlePokemon = serializePokemons(pokemonJson)
  return  { props : { singlePokemon } }
}

export async function getStaticPaths() {
  const API_URL = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  const data = await API_URL.json()
  const paths = data.results.map((pokemon: PokemonList) => ({
    params: { name: String(pokemon.name) }
  }))

  return { paths, fallback: false }
}

const SinglePokemon = ({ singlePokemon }: { singlePokemon: TSinglePokemon }) => (
  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Link href="/">
      <Button variant="contained">
        Go back
      </Button>
    </Link>
    <Typography variant='h1' component='h1'>{singlePokemon.name}</Typography>
    <Image src={singlePokemon.image} layout="fixed" width="200" height="200" />
    <Typography variant='h2' component='h2'>Abilities</Typography>
    {singlePokemon.abilities.map((ability: string) => (
      <Typography key={ability} variant='subtitle1'>{ability}</Typography>
    ))}
    <Typography variant='h2' component='h2'>Moves (first 5)</Typography>
    {singlePokemon.moves.map((move: string) => (
      <Typography key={move} variant='subtitle1'>{move}</Typography>
    ))}
  </Box>
)

export default SinglePokemon