import MD5 from "crypto-js/md5";

const hash = generateHashMD5(process.env.NEXT_PUBLIC_KEY_PUBLIC_MARVEL_API, process.env.NEXT_PUBLIC_KEY_PRIVATE_MARVEL_API, process.env.NEXT_PUBLIC_KEY_TIMESTAMP_MARVEL_API)
const auth = `apikey=${process.env.NEXT_PUBLIC_KEY_PUBLIC_MARVEL_API}&hash=${hash}&ts=${process.env.NEXT_PUBLIC_KEY_TIMESTAMP_MARVEL_API}`;
const basePath = 'http://gateway.marvel.com/v1/public'

export interface CharactersResponseAPI {
  total: number
  results: {
    id: string;
    name: string
    thumbnail: {
      path: string,
      extension: string
    }
  }[]
}

export interface Character {
  description: string
  modified: string
  name: string
  thumbnail: {
    path: string,
    extension: string
  }
}

export async function getCharacters(offset: number = 0, limit: number = 5): Promise<CharactersResponseAPI> {
  const response = await fetch(`${basePath}/characters?${auth}&limit=${limit}&offset=${offset}`);
  const json = await response.json();
  return json.data
}

export async function getCharacterById(characterId: string): Promise<Character> {
  const response = await fetch(`${basePath}/characters/${characterId}?${auth}`);
  const json = await response.json();
  return json.data.results[0]
}

function generateHashMD5(publicKey: string = "", privateKey: string = "", timestamp: string = ""): string {
  return MD5(timestamp + privateKey + publicKey).toString();
}

