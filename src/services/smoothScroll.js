export const smoothScroll = () =>
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
