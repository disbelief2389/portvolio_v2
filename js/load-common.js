function loadHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return Promise.reject();
    }
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Network error: ' + response.statusText);
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            return element;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', '/navbar.html')
        .then(navbarElement => {
            const homeLi = document.getElementById('home-li-a');
            const aboutLi = document.getElementById('about-li-a');
            const workLi = document.getElementById('work-li-a');
            const contactLi = document.getElementById('contact-li-a');

            let liArr = [homeLi, aboutLi, workLi, contactLi];

            function addClassToNavItem() {
                const currentURL = window.location.href;

                if (currentURL.includes('about.html')) {
                    aboutLi.classList.add('active-link');
                } else if (currentURL.includes('index.html')) {
                    homeLi.classList.add('active-link');
                } else if (currentURL.includes('work.html')) {
                    workLi.classList.add('active-link');
                } else if (currentURL.includes('contact.html')) {
                    contactLi.classList.add('active-link');
                }
            };

// Call the function to add the class to the corresponding nav item
addClassToNavItem();
        });
    loadHTML('footer', '/footer.html');
});