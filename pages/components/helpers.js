import { getMediaGQL, getMediaListGQL } from '@/lib/gql';
import { createRoot } from 'react-dom/client';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';
import Image from 'next/image';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { getMediaTitleGQL } from '../../lib/gql';

/**
 * searchUpdate
 * OnChange event listener.
 * @param {Object} event Onchange event object
 */
export const searchUpdate = (event) => 
{
  event.target.value.length > 2 ? search(event.target.value): false;
}

/**
 * manualSearch
 * OnClick event listener.
 */
export const manualSearch = () => 
{
  search((document.getElementById('searchBox')).value,1);
}

/**
 * throttle
 * Debounces the passed function.
 * @param {Function} func Function to be debounced
 * @param {Number} delay Millisecond delay between function calls
 * @returns 
 */
export default function throttle(func, delay) 
{
  let time;
  return function (...args) 
  {
    clearTimeout(time)
    time = setTimeout(()=>func(...args), delay);
  }
}

/**
 * search
 * Entry point for handling OMDB requests. Ensures that the passed string is valid.
 * @param {String} title Title of media to search for
 */
export async function search(title,page = 1)
{
  try
  {
    title.length > 0 ? ParseSearchResponse(await getMediaListGQL(title,page,'movie'),page,title) : false;
  }
  catch (e)
  {
    console.log(e);
  }

  /**
   * ParseSearchResponse
   * Parses a JSON object that has been returned from an OMDB search.
   * @param {Object} info JSON object from OMDB
   */
  function ParseSearchResponse(info,activePage = 1,title='')
  {
    info.data.getMediaList.Response == "True" ? ProcessSearchSuccess(info,'s',activePage) : info.data.getMediaList.Error === 'Too many results.' ? TooManyResults(title) : console.log(info.data.getMediaList.Error);
    async function TooManyResults(title)
    {
      const getMediaTitle = (await getMediaTitleGQL(title));
      getMediaTitle.data.getMediaTitle.Response == "True" ? ProcessSearchSuccess(getMediaTitle,'t',activePage) : getMediaTitle.data.getMediaTitle.Error === 'Too many results.' ? TooManyResults(title) : console.log(info.data.getMediaTitle.Error);
    }

    /**
     * ProcessSearchSuccess
     * React componenet. Creates list of movies from data returned by getMediaList.
     * @param {Object} info JSON object returned from OMDb via GraphQL
     * @param {String} searchType What type of search this is (valid values: 's', 't')
     * @param {Number} activePage Current active pagination page
     */
    function ProcessSearchSuccess(info,searchType,activePage = 1)
    {
      /**
       * PaginationSection
       * Generates the pagination selector below the search results
       * @param {*} props React properties [active: Number (Current active pagination page), totalResults: Number (total number of results that OMDb claims match this search)]
       * @returns 
       */
      const PaginationSection = (props) =>
      {
        
        let active = props.active;
        let totalResults = props.totalResults;
        let pages = Math.ceil(totalResults / 10);
        let items = [];
        if(pages > 10)
        {
          items.push(createPaginationItem(active-1,active,'Previous'));
          items.push(createPaginationItem(1,active));
          items.push(createPaginationItem(2,active));
          items.push(<Pagination.Ellipsis key={'Ellipsis1'} />);
          const midpoint = Math.ceil(pages/2);
          for (let i = midpoint; i <= midpoint + 2; i++) 
          {
            items.push(createPaginationItem(i,active));
          }
          items.push(<Pagination.Ellipsis key={'Ellipsis2'} />);
          items.push(createPaginationItem(pages-1,active));
          items.push(createPaginationItem(pages,active));
          items.push(createPaginationItem(active+1,active,'Next'));
        }
        else
        {
          for (let i = 1; i < pages; i++) 
          {
            items.push(createPaginationItem(i,active));
          }
        }
    
        return (
          <div>
            <Pagination>{items}</Pagination>
          </div>
        );
      }

      /**
       * createPaginationItem
       * React component. Generates an item that appears in the pagination selector.
       * @param {Number} i Number of page to be linked
       * @param {Number} activePage Number of the active page, not necessarily the same as i
       * @param {String} pageText Human-readable text to display in the selector. Optional, defaults to i
       * @returns 
       */
      function createPaginationItem(i,activePage,pageText = i)
      {
        return <Pagination.Item
            key={pageText}
            active={i == activePage}
            onClick={() => onPageChange(i)}
          >
            {pageText}
          </Pagination.Item>
      };

      const mediaList = searchType === 's' ? info.data.getMediaList : {'Media':[info.data.getMediaTitle]};
      let listRoot = createRoot(document.getElementById('searchResults'));
      listRoot.render(
        <>
          <ListGroup.Item key='movies' className='no-border'>
            <Row className='imageRow'>
              <ListNodes mediaList={mediaList.Media} />
            </Row>
          </ListGroup.Item>
          <Row className='auto-center pageRow'>
            <Col>
              <PaginationSection totalResults={mediaList.totalResults} active={activePage} />
            </Col>
          </Row>
          <div id='detailsModal'  className='no-display' />
        </>
      );
    }
  }

  /**
   * MovieDetails
   * Initiates a query to request details about a movie from OMDb using the movie's IMDb ID.
   * @param {String} imdbID String representing the IMDb ID of a movie
   */
  async function MovieDetails(imdbID)
  {
    try
    {
      ParseIdResponse(await getMediaGQL(imdbID));
    }
    catch (e)
    {
      console.log(e);
    }
  }

  /**
   * ParseIdResponse
   * Parses a JSON object returned from performing a getMediaGQL query in OMDb via GraphQL. Renders React components generated from the details.
   * @param {Object} info JSON object
   */
  function ParseIdResponse(info)
  {
    info.data.getMedia.Response == "True" ? ProcessIdSuccess({info}) : console.log(info.data.getMedia.Error);
    function ProcessIdSuccess({info})
    {
      const elDM = document.getElementById('detailsResults');
      const elSR = document.getElementById('searchResults');
      const elSerBar = document.getElementById('searchBar');
      const elDeBtn = document.getElementById('detailsButton');
      elSerBar.classList.add('no-display');
      elSR.classList.add('no-display');
      elDM.classList.remove('no-display');
      elDeBtn.classList.remove('no-display');
      
      let listRoot = createRoot(document.getElementById('detailsResults'));
      listRoot.render(
        <>
          <Row>
            <Col>
              <h3>{info.data.getMedia.Title}</h3>
            </Col>
            <Col>
            <div id ="modalReleased"><strong>{info.data.getMedia.Released} ◾ {info.data.getMedia.Rated} ◾ {info.data.getMedia.Runtime}</strong></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ImageWithFallback className='imageModal' src={info.data.getMedia.Poster === 'N/A'?'/noPoster.webp':info.data.getMedia.Poster.replace('SX300','SX400_Q85')} altTag={info.data.getMedia.Title} width={300} height={444} fallbackSrc='/noPoster.webp' />
            </Col>
            <Col>
              <BadgeNodes genres={info.data.getMedia.Genre}/>
              <div id="modalDirector"><strong>Director:</strong> {info.data.getMedia.Director}</div>
              <div id="modalActors"><strong>Actor(s):</strong> {info.data.getMedia.Actors}</div>
              <div id="modalWriter"><strong>Writer(s):</strong> {info.data.getMedia.Writer}</div>
              <div id="modalLanguage"><strong>Languages:</strong> {info.data.getMedia.Language}</div>
              <div id="modalCountry"><strong>Country:</strong> {info.data.getMedia.Country}</div>
              <div id="modalAwards"><strong>Awards:</strong> {info.data.getMedia.Awards}</div>
              <div id="modalBoxOffice"><strong>Box Office:</strong> {info.data.getMedia.BoxOffice}</div>
              <div id="modalImdbRating">{info.data.getMedia.imdbRating}⭐ <small>{info.data.getMedia.imdbVotes} votes</small></div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>{info.data.getMedia.Plot}</Col>
          </Row>
          <br />
        </>);
    }
  }

  /**
   * ListNodes
   * React component. [mediaList]
   * @param {*} props React properties [altTag, fallbackSrc]
   * @returns <ImageWithFallback> React object
   */
  function ListNodes(props) 
  {
    return(
      props.mediaList.map(media => 
        <Col key={media.imdbID} onClick={() => MovieDetails(media.imdbID)} md="auto" className="flex-fill justify-content-center cursor-pointer">
          <a className='imageWrapper'>
            <ImageWithFallback className='imageSearch' src={media.Poster === 'N/A'?'/noPoster.webp':media.Poster.replace('SX300','SX167_Q50')} altTag={media.Title} width={167} height={250} fallbackSrc='/noPoster.webp' />
          </a>
          <div className='imageTitle'><strong>{media.Title}</strong><br/>{media.Year}</div>
        </Col>)
    );
  }

  /**
   * BadgeNodes
   * React component. Accepts a string of comma-separated genres, splits them into an array, and generates bootstrap badges for each genre.
   * @param {*} props React properties [genres: String (Comma-separated list of genres)]
   * @returns <ImageWithFallback> React object
   */
  function BadgeNodes(props)
  {
    const genreSplit = props.genres.split(", ");
    return(
      genreSplit.map(genre => 
        <Badge key={genre} bg="secondary">{genre}</Badge>
        )
    );
  }

  /**
   * ImageWithFallback
   * React component. Generates an image that has a generic fallback image should the remote image src retrival fail.
   * @param {*} props React properties [altTag: String (img alt tag), fallbackSrc: String (URL of generic movie poster image that will display if poster lookup fails)]
   * @returns <ImageWithFallback> React object
   */
  const ImageWithFallback = (props) => 
  {
    const { src, fallbackSrc, altTag, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc} 
            alt={altTag}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
  };

  /**
   * onPageChange
   * Initiates an OMDb search for a different page of results in a large query. OMDb can display 10 results at a time.
   * @param {Number} page 
   */
  function onPageChange(page)
  {
    search((document.getElementById('searchBox')).value,page.toString());
  }
}

/**
 * closeDetails
 * Hides movie details element and 'close details' button, shows search bar and movie results list.
 */
export function closeDetails()
{
  const elDM = document.getElementById('detailsResults');
  const elSR = document.getElementById('searchResults');
  const elSerBar = document.getElementById('searchBar');
  const elDeBtn = document.getElementById('detailsButton');
  elSerBar.classList.remove('no-display');
  elSR.classList.remove('no-display');
  elDM.classList.add('no-display');
  elDeBtn.classList.add('no-display');
}
