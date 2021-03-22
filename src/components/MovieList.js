import React, { useState, useEffect } from 'react'
import { ReactComponent as LavaLamp } from '../assets/spinner.svg'


export default function MovieList() {
  const [movies, setMovies] = useState([])
  const [hasError, setHasError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://yts.mx/api/v2/list_movies.json
    `)
      // resolved
      .then((response) => response.json())
      .then(({ data }) => {
        setMovies(data.movies)
        console.log(data)
        console.log(data.movies)
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
          transform: 'translate(-50%, -50%)'
        }}
      />
    )
  }

  if (hasError) {
    return <div role="alert">{hasError.message}</div>
  }

  return (
    <div className="movieArea" lang="ko">
      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.background_image} alt="" height={80} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}