import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../images/gallery/image1.jpeg'
import image2 from '../images/gallery/image2.jpeg'
import image3 from '../images/gallery/image3.jpeg'
import image4 from '../images/gallery/image4.jpeg'
import image5 from '../images/gallery/image5.jpeg'
import image6 from '../images/gallery/image6.jpeg'


const Gallery = () => {
  // Gallery image with your actual image URLs
  const galleryImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gallery</h2>
      <div className="row">
        {galleryImages.map((imageUrl, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={imageUrl} className="card-img-top" alt={`gallary ${index + 1}`} />
              <div className="card-body">
                <h5 className="card-title">Image {index + 1}</h5>
                <Link to={`/gallery/${index}`} className="btn btn-danger">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
