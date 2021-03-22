import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as LavaLamp } from '../../assets/spinner.svg'

export default function SearchBox({
  setMovies,
  isLoading,
  setIsLoading,
  hasError,
  setHasError,
}) {
  const [input, setInput] = useState('')

  const onChange = (e) => {
    setInput(e.target.value)
  }

  // const onReset = () => {
  //   setInput('')
  //   searchInput.current.focus()
  // }

  const onSubmit = () => {
    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${input}`)
      // resolved
      .then((reponse) => reponse.json())
      .then(({ data }) => {
        setMovies(data.movies)
        setIsLoading(false)
      })
      // rejected
      .catch((error) => {
        setHasError(error)
        setIsLoading(false)
      })
  }

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
    <div className="searchArea">
      <label htmlFor="searchMovie">영화 검색</label>
      <input id="searchMovie" onChange={onChange} value={input} />
      <button
        id="searchMovie"
        // onClick={onReset}
        onClick={onSubmit}>
        검색
      </button>
    </div>
  )
}
