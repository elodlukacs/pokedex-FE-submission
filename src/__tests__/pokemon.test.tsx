import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Home from "../../pages";
import SinglePokemon from "../../pages/pokemon/[name]";

const mockPokemon = {
  "name": "bulbasaur",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "abilities": [
    "overgrow",
    "chlorophyll"
  ],
  "moves": [
    "razor-wind",
    "swords-dance",
    "cut",
    "bind",
    "vine-whip"
  ]
}

describe('Home', () => {
  beforeEach(() => {
    render(<SinglePokemon singlePokemon={mockPokemon} />)
  })

  it('it renders the pokemon', async () => {
    expect(screen.getByText(/bulbasaur/i)).toBeVisible()
  })

  it('it renders the ability', async () => {
    expect(screen.getByText(/overgrow/i)).toBeVisible()
  })

  it('it renders the move', async () => {
    expect(screen.getByText(/cut/i)).toBeVisible()
  })
})