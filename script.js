document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a[data-section]');
    const sections = document.querySelectorAll('main section');
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show selected section
            document.getElementById(`${sectionId}-section`).classList.add('active-section');
            
            // Load content for the section if empty
            loadSectionContent(sectionId);
        });
    });
    
    // Login modal functionality
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (username && password) {
            alert(`Welcome back, ${username}!`);
            loginModal.style.display = 'none';
            loginForm.reset();
        } else {
            alert('Please enter both username and password.');
        }
    });
    
    // Register link
    document.getElementById('register-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Registration functionality would go here!');
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. We'll respond to you at ${email} soon.`);
        
        // Reset the form
        this.reset();
    });
    
    // Load initial content for home section
    loadSectionContent('home');
    
    // Function to load content for sections
    function loadSectionContent(sectionId) {
        const section = document.getElementById(`${sectionId}-section`);
        const contentGrid = section.querySelector('.content-grid');
        
        // Only load if the grid is empty
        if (contentGrid && contentGrid.children.length === 0) {
            let items = [];
            
            switch(sectionId) {
                case 'anime':
                    items = getAnimeItems();
                    break;
                case 'movies':
                    items = getMovieItems();
                    break;
                case 'tv':
                    items = getTVItems();
                    break;
                case 'games':
                    items = getGameItems();
                    break;
                default:
                    return;
            }
            
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'content-item';
                itemElement.innerHTML = `
                    <div class="poster-container" data-url="${item.url}">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <h3>${item.title}</h3>
                        ${item.year ? `<p class="year">${item.year}</p>` : ''}
                        ${item.rating ? `<div class="rating">⭐ ${item.rating}</div>` : ''}
                    </div>
                `;
                contentGrid.appendChild(itemElement);
            });
            
            // Add click event to all posters after loading
            addPosterClickEvents();
        }
    }
    
    // Add click events to all posters
    function addPosterClickEvents() {
        const posters = document.querySelectorAll('.poster-container');
        posters.forEach(poster => {
            poster.style.cursor = 'pointer';
            poster.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank');
                }
            });
        });
    }
    
    // Anime Data with URLs
    function getAnimeItems() {
        return [
            {
                title: "Attack on Titan",
                image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
                year: "2013",
                rating: "8.5",
                url: "https://aniwatchtv.to/attack-on-titan-112?ref=search"
            },
            {
                title: "Demon Slayer",
                image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
                year: "2019",
                rating: "8.7",
                url: "https://aniwatchtv.to/demon-slayer-kimetsu-no-yaiba-47?ref=search"
            },
            {
                title: "Jujutsu Kaisen",
                image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
                year: "2020",
                rating: "8.6",
                url: "https://aniwatchtv.to/jujutsu-kaisen-tv-534?ref=search"
            },
            {
                title: "One Piece",
                image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
                year: "1999",
                rating: "8.6",
                url: "https://aniwatchtv.to/one-piece-100?ref=search"
            },
            {
                title: "My Hero Academia",
                image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
                year: "2016",
                rating: "8.4",
                url: "https://aniwatchtv.to/my-hero-academia-322?ref=search"
            },
            {
                title: "Death Note",
                image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
                year: "2006",
                rating: "8.6",
                url: "https://aniwatchtv.to/death-note-60?ref=search"
            },
            {
                title: "Naruto Shippuden",
                image: "https://cdn.myanimelist.net/images/anime/1565/111305.jpg",
                year: "2007",
                rating: "8.3",
                url: "https://aniwatchtv.to/naruto-shippuden-355?ref=search"
            },
            {
                title: "Tokyo Revengers",
                image: "tokyo revengers.jpg",
                year: "2021",
                rating: "8.0",
                url: "https://aniwatchtv.to/tokyo-revengers-15585?ref=search"
            }
        ];
    }
    
    // Movie Data with URLs
    function getMovieItems() {
        return [
            {
                title: "The Shawshank Redemption",
                image: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
                year: "1994",
                rating: "9.3",
                url: "https://yeshd.net/the-shawshank-redemption-1994"
            },
            {
                title: "The Godfather",
                image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                year: "1972",
                rating: "9.2",
                url: "https://yeshd.net/the-godfather-1972"
            },
            {
                title: "The Dark Knight",
                image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
                year: "2008",
                rating: "9.0",
                url: "https://https://yeshd.net/the-dark-knight-2008"
            },
            {
                title: "Pulp Fiction",
                image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                year: "1994",
                rating: "8.9",
                url: "https://yeshd.net/pulp-fiction-1994"
            },
            {
                title: "Inception",
                image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
                year: "2010",
                rating: "8.8",
                url: "https://yeshd.net/inception-2010"
            },
            {
                title: "Parasite",
                image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
                year: "2019",
                rating: "8.6",
                url: "https://yeshd.net/parasite-2019"
            },
            {
                title: "Spirited Away",
                image: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                year: "2001",
                rating: "8.6",
                url: "https://yeshd.net/spirited-away-2001-eng-sub"
            },
            {
                title: "Interstellar",
                image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                year: "2014",
                rating: "8.6",
                url: "https://yeshd.net/interstellar-2014"
            }
        ];
    }
    
    // TV Series Data with URLs
    function getTVItems() {
        return [
            {
                title: "Breaking Bad",
                image: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
                year: "2008-2013",
                rating: "9.5",
                url: "https://yeshd.net/series/breaking-bad-season-1"
            },
            {
                title: "Game of Thrones",
                image: "GOT.jpg",
                year: "2011-2019",
                rating: "9.2",
                url: "https://yeshd.net/series/game-of-thrones-season-1"
            },
            {
                title: "Stranger Things",
                image: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
                year: "2016-",
                rating: "8.7",
                url: "https://yeshd.net/series/stranger-things-season-1"
            },
            {
                title: "The Mandalorian",
                image: "https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg",
                year: "2019-",
                rating: "8.7",
                url: "https://yeshd.net/series/disney-gallery-the-mandalorian-season-1"
            },
            {
                title: "The Last of Us",
                image: "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
                year: "2023-",
                rating: "8.8",
                url: "https://yeshd.net/series/the-last-of-us-season-1"
            },
            {
                title: "The Witcher",
                image: "witcher.jpg",
                year: "2019-",
                rating: "8.2",
                url: "https://yeshd.net/series/the-witcher-season-1"
            },
            {
                title: "House of the Dragon",
                image: "https://m.media-amazon.com/images/M/MV5BZjBiOGIyY2YtOTA3OC00YzY1LThkYjktMGRkYTNhNTExY2I2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
                year: "2022-",
                rating: "8.5",
                url: "https://yeshd.net/series/house-of-the-dragon-season-1"
            },
            {
                title: "The Boys",
                image: "the boys.jpg",
                year: "2019-",
                rating: "8.7",
                url: "https://yeshd.net/series/the-boys-season-1"
            }
        ];
    }
    
    // Games Data with URLs
    function getGameItems() {
        return [
            {
                title: "The Legend of Zelda: Tears of the Kingdom",
                image: "zelda.jpg",
                year: "2023",
                rating: "9.6",
                url: "https://www.metacritic.com/game/switch/the-legend-of-zelda-tears-of-the-kingdom"
            },
            {
                title: "Elden Ring",
                image: "elden.jpg",
                year: "2022",
                rating: "9.5",
                url: "https://www.metacritic.com/game/pc/elden-ring"
            },
            {
                title: "God of War: Ragnarök",
                image: "god of war.jpg",
                year: "2022",
                rating: "9.4",
                url: "https://www.metacritic.com/game/playstation-5/god-of-war-ragnarok"
            },
            {
                title: "Red Dead Redemption 2",
                image: "rdr2.jpg",
                year: "2018",
                rating: "9.7",
                url: "https://www.metacritic.com/game/playstation-4/red-dead-redemption-2"
            },
            {
                title: "The Last of Us Part II",
                image: "last of us.webp",
                year: "2020",
                rating: "9.2",
                url: "https://www.metacritic.com/game/playstation-4/the-last-of-us-part-ii"
            },
            {
                title: "Cyberpunk 2077",
                image: "cyberpunk.jpg",
                year: "2020",
                rating: "8.2",
                url: "https://www.metacritic.com/game/pc/cyberpunk-2077"
            },
            {
                title: "Hogwarts Legacy",
                image: "hogwarts.jpg",
                year: "2023",
                rating: "9.2",
                url: "https://www.metacritic.com/game/playstation-5/hogwarts-legacy"
            },
            {
                title: "Starfield",
                image: "starfield.jpg",
                year: "2023",
                rating: "8.5",
                url: "https://www.metacritic.com/game/pc/starfield"
            }
        ];
    }
});