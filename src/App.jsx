import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import { fetchGallery } from './services/gallery-api';
import { smoothScroll } from './services/smoothScroll';
import { ToastContainer, toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';

export default class App extends Component {
  state = {
    searchValue: '',
    gallery: [],
    page: 1,
    isModalOpen: false,
    reqStatus: 'idle,',
    largeImgUrl: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    try {
      if (prevState.searchValue !== this.state.searchValue) {
        this.setState({
          reqStatus: 'pending',
          largeImgUrl: '',
        });
        const images = await fetchGallery(searchValue, page);

        if (images.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              autoClose: 3000,
            },
          );
        }

        this.setState(prev => ({
          reqStatus: 'resolved',
          gallery: images,
          page: prev.page + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleLoadMore = async () => {
    const { searchValue, page } = this.state;
    const images = await fetchGallery(searchValue, page);

    this.setState(prev => ({
      gallery: [...prev.gallery, ...images],
      page: prev.page + 1,
    }));
    smoothScroll();
  };

  handleSubmit = searchValue => {
    this.setState({
      searchValue,
      page: 1,
    });
  };

  handleLargeImgUrl = e => {
    this.setState({
      isModalOpen: true,
      largeImgUrl: e.target.dataset.large,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { gallery, reqStatus, isModalOpen, largeImgUrl } = this.state;
    const galleryLength = gallery.length > 1;

    if (reqStatus === 'pending') {
      return (
        <Rings
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      );
    }

    return (
      <div className="Container">
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery onClick={this.handleLargeImgUrl} gallery={gallery} />
        {galleryLength && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {isModalOpen && (
          <Modal src={largeImgUrl} onClose={this.toggleModal}>
            <div style={{ width: 900 }}>
              <img src={largeImgUrl} alt="" />
            </div>
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}

// import React, { Component } from 'react';

// import { fetchImagesWithQuery } from './services/gallery-api';

// import { Layout } from './Components/Layout/Layout';
// import { Searchbar } from './Components/SearchBar/SearchBar';
// import { ImageGallery } from './Components/ImageGallery/ImageGallery';

// import { Modal } from './Components/Modal/Modal';
// import { Button } from './Components/Button/Button';
// import { Loader } from './Components/Loader/Loader';
// import { Notification } from './Notification/Notification';

// export class App extends Component {
//   state = {
//     images: [],
//     loading: false,
//     error: null,
//     searchBarQuery: '',
//     page: 1,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.searchBarQuery;
//     const nextQuery = this.state.searchBarQuery;

//     if (prevQuery !== nextQuery) {
//       this.fetchImages();
//     }

//     if (!this.state.loading) {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   fetchImages = () => {
//     const { searchBarQuery, page } = this.state;
//     this.setState({ loading: true });
//     fetchImagesWithQuery(searchBarQuery, page)
//       .then(images =>
//         this.setState(prevState => ({
//           images: [...prevState.images, ...images],
//           page: prevState.page + 1,
//         })),
//       )
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ loading: false }));
//   };

//   handleSubmitSearchBar = query => {
//     this.setState({ searchBarQuery: query, page: 1, images: [] });
//     console.log(query);
//   };

//   openModalImage = largeImage => {
//     this.setState({ showModal: largeImage });
//   };

//   closeModalImage = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const { searchBarQuery, images, loading, error, showModal } = this.state;
//     return (
//       <Layout>
//         <Searchbar onSubmitSearch={this.handleSubmitSearchBar} />
//         {error && (
//           <Notification
//             message={`Whoops, something went wrong: ${error.message}`}
//           />
//         )}

//         {!searchBarQuery && <Notification message="Input image for search" />}

//         {images.length > 0 && (
//           <ImageGallery images={images} onOpen={this.openModalImage} />
//         )}

//         {loading && <Loader />}

//         {showModal && (
//           <Modal closeModal={this.closeModalImage}>
//             <img src={showModal} alt="" />
//           </Modal>
//         )}

//         {images.length > 0 && !loading && (
//           <Button onButtonClick={this.fetchImages}></Button>
//         )}
//       </Layout>
//     );
//   }
// }
