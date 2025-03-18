
import { useState } from "react";

const MovieCard = ({ show }) => {
  const [imgSrc, setImgSrc] = useState(show.imageSet?.verticalPoster?.w360 || 'https://picsum.photos/200/300');

  // return (
  //   <div className="col-md-4 mb-5">
  //     <div className="card" style={{backgroundColor:'#ECEAEA'}}>
  //       <img
  //         src={imgSrc}
  //         className="card-img-top"
  //         alt={show.title}
  //         style={{ height: '300px', objectFit: 'cover' }}
  //         onError={() => setImgSrc('https://picsum.photos/200/300')}
  //       />
  //       <div className="card-body" style={{display:'flex',alignSelf:'center',}}
  //       >
        
  //         <h5 className="card-title" style={{fontSize:'2rem',fontWeight:'650'}}>{show.title.replace(/#/g, '').trim()}</h5>
  //         <p className="card-description">{show.overview}</p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="col-md-4 mb-5">
      <div className="card" style={{backgroundColor:'#ECEAEA'}}>
        <img
          src={imgSrc}
          className="card-img-top"
          alt={show.title}
          style={{ height: '300px', objectFit: 'cover' }}
          onError={() => setImgSrc('https://picsum.photos/200/300')}
        />
        <div className="card-body" style={{display:'flex',flexDirection: 'column',alignItems:'center'}}>
          <h5 className="card-title" style={{fontSize:'2rem',fontWeight:'650'}}>
            {show.title.replace(/#/g, '').trim()}
          </h5>
          <p className="card-description">{show.overview}</p>
        </div>
      </div>
    </div>
  );

};

export default MovieCard;