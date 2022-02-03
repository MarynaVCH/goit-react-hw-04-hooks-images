import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export default function ImageGallery({ gallery, onClick }) {
  return (
    <ImageGalleryList>
      {gallery.map(item => (
        <ImageGalleryItem onClick={onClick} key={item.id} item={item} />
      ))}
    </ImageGalleryList>
  );
}
