import { ChangeEvent, useState } from "react";
import { Paper, Typography, styled, Grid, TextField}  from "@mui/material";
import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ccc',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'white',
  }
}));

type PokemonListProps = {
  name: string;
  url: string;
}

export const getStaticProps = async () => {
  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100"
  const request = await fetch(API_URL)
  const pokemonList = await request.json()
  return  { props : { pokemonList } }
}

const Home = ({ pokemonList }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [query, setQuery] = useState('')

  const handleNameSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // unbounce here maybe
    setQuery(e.target.value)
  }

  const pokeList = pokemonList.results as PokemonListProps[]
  const filteredPokemons = pokeList.filter(poke => poke.name.toLowerCase().includes(query))

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="PokeDex" />
      </Head>
      <Typography variant='h1' component='h1'>Pokedex</Typography>
      <TextField onChange={handleNameSearch} label='Search' placeholder='Search ...' fullWidth  />
      <main className={styles.main}>
        <Grid container spacing={2}>
          {filteredPokemons.map((pokemon: any) => (
            <Grid item xs={4} key={pokemon.name}>
              <Item>
                <Link href={`/pokemon/${pokemon.name}`}>
                  {pokemon.name}
                </Link>
              </Item>
            </Grid>
          ))}
        </Grid>
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
