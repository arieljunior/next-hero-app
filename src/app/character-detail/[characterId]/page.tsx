"use client"
import { useEffect, useState } from 'react';
import { Character, getCharacterById } from '../../../services/api';
import DetailCharacter from '@/components/DetailCharacter';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styles from "./syles.module.css";
interface PageProps {
  params: {
    characterId: string
  }
}

export default function Page({ params }: PageProps) {
  const { characterId } = params;
  const [character, setCharacter] = useState<Character | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (!characterId) return

    getCharacterById(characterId).then(response => {
      const myCharacter: Character = {
        ...response,
        modified: new Date(response.modified).toLocaleDateString()
      }
      setCharacter(myCharacter)
    })
  }, [characterId])
  return <div className={styles.containerDetail}>
    <Button type='button' variant="light" onClick={() => router.back()}>Back</Button>
    {character && <DetailCharacter description={character.description} lastModified={character.modified} name={character.name} urlImage={character.thumbnail.path + "." + character.thumbnail.extension} />}
  </div>
}