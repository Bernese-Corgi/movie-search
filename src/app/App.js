import Input from 'components/Input'
import MovieList from 'components/MovieList'
import React, { useState, useEffect } from 'react'

// https://yts.mx/api/v2/list_movies.json

function App() {
  return (
    <div className="App" lang="ko">
      <h1>영화 검색</h1>
      <Input />
      <MovieList />
    </div>
  )
}

export default App
    // <div className="App" lang="en">
    //   <h1>Movie Name</h1>
    //   <div className="movieArea" lang="ko">
    //   </div>
    // </div>