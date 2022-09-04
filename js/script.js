// this will dynamically load category buttons

const loadCatagory = async () => {
    const catagoryUrl = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(catagoryUrl);
    const data = await res.json();
    const newsCatagories = data.data.news_category;
    const newsLength = newsCatagories.length;

    for (let i = 0; i < newsLength; i++) {
        const catagory = newsCatagories[i].category_name;
        const newsCatagory = document.getElementById('news-catagories');
        const newsDiv = document.createElement('div')
        newsDiv.classList.add("col");
        newsDiv.innerHTML = `
        <button class="btn btn-primary" id="" onclick = "buttonClick(${i + 1}), loadNews(${i + 1}) " href = "" > ${catagory}</ > `
        // start loader
        newsCatagory.appendChild(newsDiv);
    }
}

const buttonClick = (btn) => {
    toggleSpinner(true);
}

var newsItemLength = 0;


// this will load news by looping
const loadNews = async (item) => {
    const newsID = '0' + item;
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${newsID}`;
    const res = await fetch(newsUrl);
    const data = await res.json();

    const newsArrayLenght = data.data.length;
    newsItemLength = newsArrayLenght;
    displayNews(data.data)

    let founNews = document.getElementById('found-item-number')
    founNews.innerText = newsArrayLenght;
}

// this will display news
const displayNews = newsList => {
    const newsContainer = document.getElementById('news-cards');
    newsContainer.textContent = '';
    newsList.forEach(news => {
        let authorName = news.author.name;

        if (authorName === null || authorName === 'system') {
            authorName = 'no name available'
        }
        else {
            authorName = news.author.name;
        }
        let newsView = news.total_view;
        if (news.total_view === null) {
            newsView = 'No'
        }
        const cardText = news.details
        const cardTitle = news.title
        const slicedText = cardText.slice(0, 200) + '...';
        const modalBody = document.getElementById('modal-body-text')
        modalBody.innerText = slicedText;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `<div class="card mt-5 container">
        <div class="row g-0">
          <div class="col-md-4">
            <img src = "${news.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${cardTitle}</h5>
              <p class="card-text">${slicedText}</p>
            </div>
            <div class="d-flex justify-content-around">
            <p><img src="${news.author.img}" style="max-width: 50px;" class="rounded-circle"> ${authorName}</p>
            <p>${newsView} ${'views'}</p >
            <p>${news.rating.number}${'⭐'}</p>
            <button class="btn btn-outline-primary py-0" onclick="modalOpen(${cardTitle} , ${slicedText})" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">${'↩'}</button>
            </div >
          </div >
        </div >
      </div > `
        newsContainer.appendChild(newsDiv)
        toggleSpinner(false);
    });
}

// spinner function

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

loadNews();

loadCatagory();

displayNews();


