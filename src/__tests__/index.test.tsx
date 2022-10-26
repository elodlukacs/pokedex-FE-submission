import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Home from "../../pages";

const mockPokemonList = [
  {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  },
  {
    "name": "venusaur",
    "url": "https://pokeapi.co/api/v2/pokemon/3/"
  }
]

describe('Home', () => {
  beforeEach(() => {
    render(<Home pokemonList={{ results: mockPokemonList }} />)
  })

  it('it renders input', async () => {
   expect(screen.getByRole('textbox')).toBeVisible()
  })

  it('it renders list with links', async () => {
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })

  it('filters the list with the input', async () => {
    const inputField = screen.getByRole('textbox')

    fireEvent.change(inputField, { target: { value: 'bulba'}})

    expect(screen.getAllByRole('link')).toHaveLength(1)
  })
})