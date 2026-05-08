import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
//import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

        static defaultProps={
                  country : 'us',
                  pageSize : 5,
                  category : 'general'
                }

                static propTypes={
                    country : PropTypes.string,
                  pageSize :PropTypes.number,
                  category : PropTypes.string,
                }



  constructor(){
       super();

        this.state = {
           articles : [],
            loading : false,
            page : 1,
            totalResults :0,
   }  }

 async componentDidMount() {
   //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3396588347e040b78b4b5bc44ce7ee6e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
   let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=f13df0b86e7d4a37af5a3bfb6666b1ac`;

  let data = await fetch(url);
  let parsedData = await data.json();

  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults
  });
}


     handlePreviousClick = async ()=> {
            console.log ("show previous"); 
               let url =` https://newsapi.org/v2/top-headlines?country=us&apiKey=f13df0b86e7d4a37af5a3bfb6666b1ac`;
            //  https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=YOUR_API_KEY&page=${this.state.page}&pageSize=${this.props.pageSize}`;

                           
     let data = await fetch(url);
  let parsedData = await data.json();

  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles
  });
  
};
    handleNextClick = async () => {
  if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
    console.log(this.props,'afa')
    let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=f13df0b86e7d4a37af5a3bfb6666b1ac`;
    // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=YOUR_API_KEY&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    });
  }
};

  render() {
    
    return (
      <div className="container my-3 ">

        <h1 className='text-center' style={{margin : '70px'}}>Top HeadLines </h1>
            
        <div className = "row">

         {this.state.articles && this.state.articles.map((element) => {

        return <div className="col-md-4"  key ={element.url}>
       <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""}  imageUrl ={element.urlToImage}
       newurl = {element.url} />
                        
         </div>

})}

            <div className="container  d-flex justify-content-between">  <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePreviousClick}>&larr; Previous</button>  <button disabled={( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-success" onClick={this.handleNextClick}> Next &rarr; </button> </div>
            
        </div> 
        
      </div>
    )
  }
}

export default News