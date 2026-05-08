import React from 'react'

const NewItem = (props) => {

      let { title , description , imageUrl , newsurl} = props ;

    return (
      <div>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href= {newsurl}  target = "_blank" rel= "noreferrer" className="btn btn-dark"> Go somewhere</a>
        </div>
        </div>
      </div>
    )
  
}

export default NewItem