import React, { useState, useEffect } from 'react'
import { ReactComponent as LavaLamp } from '../assets/spinner.svg'
import MovieList from 'components/MovieList/MovieList'
import SearchBox from '../components/SearchBox/SearchBox'

export default function MoviePage() {
  const [movies, setMovies] = useState([])
  const [hasError, setHasError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://yts.mx/api/v2/list_movies.json`)
      // resolved
      .then((response) => response.json())
      .then(({ data }) => {
        setMovies(data.movies)
        // console.log(movies)
        setIsLoading(false)
      })
      // rejected
      .catch((error) => {
        setHasError(error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <LavaLamp
        title="로딩 중..."
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )
  }

  if (hasError) {
    return <div role="alert">{hasError.message}</div>
  }

  return (
    <>
      <h1>Movie Search</h1>
      <SearchBox
        // onChangeSearch={setMovies}
        setMovies={setMovies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        hasError={hasError}
        setHasError={setHasError}
      />
      <MovieList movies={movies} />
    </>
  )
}
