const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

function createUserCard(user){
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user__info">
            <h2 class="user__title" >${user.name}</h2>
            <p>${user.bio}</p>
            <ul class"user__items">
                <li class"user__item" >${user.followers} <strong>Followers</strong></li>
                <li class"user__item>${user.following} <strong>Following</strong></li>
                <li class"user__item>${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `;
    main.innerHTML = cardHTML;

};
async function getRepos(userName){
    try {
        
        const {data} = await axios(APIURL + userName + `/repos?sort=created`);
        // console.log(data);
        addReposToCard(data);

    } catch (error) {
        console.log(error);
    }

}

function addReposToCard(repositorys){
    const repos = document.getElementById('repos');
    repositorys
        .slice(0,5)
        .forEach(repo => {
            const repoElement = document.createElement('a');
            repoElement.classList.add('repo');
            repoElement.href = repo.html_url;
            repoElement.target = '_blank';
            repoElement.innerText = repo.name;
            repos.appendChild(repoElement);
        });

}

async function getUser(userName){
    try {
        const {data} = await axios(APIURL + userName);
        // console.log(data);
        createUserCard(data);
        getRepos(userName);

    }catch(err){
        console.log(err);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value
    if(user){
        getUser(user);
        search.value = '';
    }
});