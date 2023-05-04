import { getMediaGQL, getMediaListGQL } from '@/lib/gql';
import { createRoot } from 'react-dom/client';
import { ListGroup, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
export function throttle(func, delay) 
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

    function ProcessSearchSuccess(info,searchType,activePage = 1)
    {
      const PaginationSection = (props) =>
      {
        
        let active = props.active;
        let totalResults = props.totalResults;
        let pages = Math.ceil(totalResults / 10);
        let items = [];
        if(pages > 10)
        {
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
          <div id='detailsModal' />
        </>
      );
    }
  }

  function createPaginationItem(i,activePage)
  {
    return <Pagination.Item
        key={i}
        active={i == activePage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
  };

  async function MovieDetails(imdbID)
  {
    try
    {
      ParseIdResponse(await getMediaGQL(imdbID));
      window.addEventListener("DOMContentLoaded", (event) => {
        document.getElementById("newModal").addEventListener("click", document.getElementById('newModal').classList.add('no-display'));
    });

    }
    catch (e)
    {
      console.log(e);
    }
  }

  function ParseIdResponse(info)
  {
    info.data.getMedia.Response == "True" ? ProcessIdSuccess({info}) : console.log(info.data.getMedia.Error);
    function ProcessIdSuccess({info})
    {
      const noDisplay = document.querySelectorAll('.no-display');
      noDisplay.forEach((el) => {
        el.classList.remove('no-display');
        el.classList.add('do-display');
      });

      let modalRoot = createRoot(document.getElementById('detailsModal'));
      modalRoot.render(
        <>
          <Modal show={true} backdrop={false} fullscreen={false} id='newModal'>
            <Modal.Header closeButton><h3>{info.data.getMedia.Title}</h3></Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <ImageWithFallback className='imageModal' src={info.data.getMedia.Poster === 'N/A'?'/noPoster.webp':info.data.getMedia.Poster.replace('SX300','SX400_Q85')} altTag={info.data.getMedia.Title} width={300} height={444} fallbackSrc='/noPoster.webp' />
                </Col>
                <Col>
                  <div id ="modalReleased">{info.data.getMedia.Released} ◾ {info.data.getMedia.Rated} ◾ {info.data.getMedia.Runtime}</div>
                  <div id="modalGenre">Genre: {info.data.getMedia.Genre}</div>
                </Col>
              </Row>
              <Row>
                <Col>{info.data.getMedia.Plot}</Col>
              </Row>
              <Row>
                <Col>
                  <div id="modalDirector">Director: {info.data.getMedia.Director}</div>
                  <div id="modalActors">Actor(s): {info.data.getMedia.Actors}</div>
                  <div id="modalWriter">Writer(s): {info.data.getMedia.Writer}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div id="modalLanguage">Languages: {info.data.getMedia.Language}</div>
                  <div id="modalAwards">Awards: {info.data.getMedia.Awards}</div>
                  <div id="modalImdbRating">IMDb Rating: {info.data.getMedia.imdbRating} from {info.data.getMedia.imdbVotes} votes</div>
                  <div id="modalBoxOffice">Box Office: {info.data.getMedia.BoxOffice}</div>
                </Col>
                <Col>
                  <div id="modalCountry">Country: {info.data.getMedia.Country}</div>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </>
      );
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
   * ImageWithFallback
   * React component.
   * @param {*} props React properties [altTag, fallbackSrc]
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

  function onPageChange(page)
  {
    search((document.getElementById('searchBox')).value,page.toString());
  }
}
