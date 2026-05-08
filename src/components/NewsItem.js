import React from 'react'

const NewItem = (props) => {
  let { title, description, imageUrl, newsurl } = props;

  return (
    <div className="d-flex mb-4">
      <div className="card h-100 w-100" style={{ minHeight: '400px', maxHeight: '400px' }}>
        
        <img
          src={imageUrl || "https://placehold.co/400x200?text=No+Image"}
          className="card-img-top"
          alt="news"
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h5>

          <p className="card-text" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>

          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark mt-auto w-100"
          >
            Read More
          </a>
        </div>

      </div>
    </div>
    
  )
}

export default NewItem