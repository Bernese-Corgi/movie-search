import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as LavaLamp } from '../assets/spinner.svg'

export default function Input() {
  const [input, setInput] = useState('')
  const [movies, setMovies] = useState([])
  const [hasError, setHasError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchInput = useRef()

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onReset = () => {
    setInput('')
    searchInput.current.focus()
  }

  const onSubmit = (e) => {
    console.log(e.target)
    // setInput()
  }

  useEffect(() => {
    fetch(`https://yts.mx/api/v2/list_movies.json?sort=${input}&limit=15`)
      // resolved
      .then((reponse) => reponse.json())
      .then((data) => {
        setMovies(data.movies)
        setIsLoading(false)
      })
      // rejected
      .catch((error) => {
        setHasError(error)
        setIsLoading(false)
      })
  }, [input])

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
    <div className="searchArea">
      <label htmlFor="searchMovie">영화 검색</label>
      <input
        id="searchMovie"
        onChange={onChange}
        value={input}
        ref={searchInput}
      />
      <input
        type="button"
        id="searchMovie"
        // onClick={onReset}
        onClick={onSubmit}
        value="검색"
      />
    </div>
  )
}