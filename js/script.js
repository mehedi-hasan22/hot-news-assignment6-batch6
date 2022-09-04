

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
        newsCatagory.appendChild(newsDiv);
    }


}

const buttonClick = (btn) => {
    console.log('btn-clicked', btn);
}


const loadNews = async (i) => {
    const newsID = '0' + i;
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${newsID}`;
    const res = await fetch(newsUrl);
    const data = await res.json();

    const newsArrayLenght = data.data.length;

    const newsCards = document.getElementById('news-cards');
    const newsDiv = document.createElement('div')
    newsDiv.innerHTML = `
    <div class="card my-3 container">
        <div class="row">
          <div class="col-md-4">
            <img src="${data.data[0].thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.data[0].title}</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
    </div>
    `
    newsCards.appendChild(newsDiv);
}

loadNews();

loadCatagory();

