import React from 'react';
import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <ImageGalleryListItem>
      <ImageGalleryItemImage
        data-large={item.largeImageURL}
        onClick={onClick}
        src={item.webformatURL}
        alt=""
      />
    </ImageGalleryListItem>
  );
}
