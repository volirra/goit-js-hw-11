 fetchImages(query, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(data.hits);
        const totalPages = Math.ceil(data.totalHits / perPage);

        if (page >= totalPages) {
          allPagesLoaded = true;
        }
        simpleLightBox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });


function onloadMore() {
  if (allPagesLoaded) {
    return;
  }
  page += 1;

  fetchImages(query, page, perPage)
    .then(data => {
      if (data.hits.length === 0) {
        allPagesLoaded = true;
      } else {
        renderGallery(data.hits);
        simpleLightBox.refresh();

        const totalPages = Math.ceil(data.totalHits / perPage);

        if (page >= totalPages) {
          allPagesLoaded = true;
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      }
    })
    .catch(error => console.log(error));
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}

function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onloadMore();
  }
}

window.addEventListener('scroll', showLoadMorePage);

arrowTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', function () {
  arrowTop.hidden = scrollY < document.documentElement.clientHeight;
});

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return Promise.reject(error);
  }
);

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}