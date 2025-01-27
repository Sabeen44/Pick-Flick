
import { useState } from "react";

const MovieCard = ({ show }) => {
  const [imgSrc, setImgSrc] = useState(show.imageSet?.verticalPoster?.w360 || 'https://picsum.photos/200/300');

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={imgSrc}
          className="card-img-top"
          alt={show.title}
          style={{ height: '300px', objectFit: 'cover' }}
          onError={() => setImgSrc('https://picsum.photos/200/300')}
        />
        <div className="card-body">
          <h5 className="card-title">{show.title.replace(/#/g, '').trim()}</h5>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;