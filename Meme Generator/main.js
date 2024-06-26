const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const nameAuthor = document.querySelector(".meme-generator .meme-author");
const loader = document.querySelector(".loader");
const saveMemeBtn = document.querySelector(".meme-generator .save-meme-btn");
const shareMemeBtn = document.querySelector(".meme-generator .share-meme-btn");

const updateDetails = (url, title, author) => {
    memeImage.onload = () => {
        loader.style.display = "none";
        memeImage.style.display = "block";
    };
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    nameAuthor.innerHTML = `Meme by: ${author}`;
};

const generateMeme = () => {
    memeTitle.innerHTML = "Loading...";
    memeImage.style.display = "none";
    loader.style.display = "block";
    fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) => {
        updateDetails(data.url, data.title, data.author);
    });
};

const saveMeme = () => {
    const link = document.createElement("a");
    link.href = memeImage.src;
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const shareMeme = () => {
    const shareData = {
        title: memeTitle.innerHTML,
        text: nameAuthor.innerHTML,
        url: memeImage.src
    };

    if (navigator.share) {
        navigator.share(shareData).then(() => {
            console.log('Meme shared successfully');
        }).catch((error) => {
            console.error('Error sharing meme:', error);
        });
    } else {
        alert('Your browser does not support the Web Share API');
    }
};

generateMemeBtn.addEventListener("click", generateMeme);
saveMemeBtn.addEventListener("click", saveMeme);
shareMemeBtn.addEventListener("click", shareMeme);
generateMeme();
