export const getPokemonData = async () => {
    const id = Math.ceil(Math.random() * 100);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const output = await response.json();

    return output;
};
