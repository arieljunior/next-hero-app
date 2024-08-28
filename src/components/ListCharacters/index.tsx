"use client"

import { useListCharacters } from "@/hooks/useAllCharacters";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./styles.module.css";
import { Button, Card, Pagination, Spinner } from "react-bootstrap";

export default ()=>{
  const { limitPage, page, setPage } = usePagination();
  const { data, error, isLoading } = useListCharacters();

  const router = useRouter();

  const totalPages = useMemo(() => {
    if (!data) return 1
    return Math.round(data.total / limitPage)
  }, [data])

  const handleGoToCharacterDetail = (characterId: string) => {
    router.push(`character-detail/${characterId}`)
  }
  if (isLoading) {
    return <Spinner animation="grow" variant="light" />
  }
  return (<main className={styles.main}>
    <div className={styles.listCards}>
      {data && data.results.map(result => (
        <Card key={result.id} style={{ width: '18rem', maxHeight: '500px' }}>
          <Card.Img variant="top" src={result.thumbnail.path + "." + result.thumbnail.extension} />
          <Card.Body>
            <Card.Title>{result.name}</Card.Title>
            <Button variant="primary" type="button" onClick={() => handleGoToCharacterDetail(result.id)}>See more</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    <Pagination>
      <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
      <Pagination.Item disabled>{page}</Pagination.Item>
      <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
    </Pagination>
  </main>)
}