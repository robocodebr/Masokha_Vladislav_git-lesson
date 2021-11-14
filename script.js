
let form = document.querySelector("form");
function search(e) {
    e.preventDefault();
    let searchText = form.elements.search.value;
    fetch(`https://api.github.com/users/${searchText}`)
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        console.log(data);
        let card = document.getElementById("card");
        if(data.message == "Not Found"){
            card.innerHTML = data.message;
        } else if(data.login){
            card.innerHTML = drawCard(data);
        }
    })
}

function trottle(func, ms) {
    let isTrottle = false;
    function wrapper(params) {
        if(!isTrottle) {
            func(params);
            isTrottle = true;
            setTimeout(function() {
                isTrottle = false
            }, ms);
        } else {
            params.preventDefault();
        }
    }
    return wrapper;
}
 let trottleSearch = trottle(search, 1000);
form.addEventListener("change", trottleSearch);
form.addEventListener("submit", trottleSearch);

function drawCard(person){
    return `<h1>${person.login}</h1>
    <img src="${person.avatar_url}" alt="${person.login}">
    <a href="${person.html_url}">Link to prolfile</a>`
} 

