import React from 'react'

export default function MovieList({ movies }) {
  return (
    <>
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
    </>
  )
}
