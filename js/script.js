/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Exceeds Search Feature:

// Generate search bar by selecting the parent node, storing the HTML template literal, and then inserting the code 
// using insertAdjacentHTML
const header = document.querySelector('header');
const searchField = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label> 
   `;
header.insertAdjacentHTML('beforeend', searchField)

// Select the newly created search input element and the search button for subsequent eventListeners
const search = document.querySelector('input');
const submit = document.querySelector('button');

// Create an empty array to store search results. This array will be passed as an argument on the showPage and
// addPagination functions to display the search results
let results = [];

// Create search function that loops through the [data] array, converts content to lowerCase and compares 
// the value of the searchInput to each entry.  If there is a match the match is pushed to the [resutls] array.
// The basic concept of the search function as well as the event listeners was obtained via the study tutorial provided by
// Team TreeHouse
function performSearch(searchInput, list) {
   for (let i=0; i<list.length; i++) {
      if (searchInput.value.length !== 0 && list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || 
         list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())) {
            results.push(list[i]);
      } 
   }
}

// eventListener for the "submit" button. Listens for 'click', clears the contents of [results], then calls the performSearch
// function passing the value of the searchInput, and the [data] array which then repopulates the [results] array.  
// Then it calls the the showPage function and passes the [results] array instead of the [data] array, and then paginates
// the search results.  If no results are returned then a message is displayed using insertAdjacentHTML.  
submit.addEventListener('click', (event) => {
   event.preventDefault();
   results = [];
   performSearch(search, data);
   showPage(results, 1)
   addPagination(results);
   const studentList = document.querySelector('.student-list');
   if (results.length === 0) {
      const alert = `
      <li class = "student-item cf>
         <div class= "no-results">
            <h3>Your search returned zero results</h3>
         </div>
      </li>
      `;
      studentList.insertAdjacentHTML('beforeend', alert);
   }
});

// eventListener for the "submit" button with the "keyup" event.  It has the same basic functionality as the "click" listener.
search.addEventListener('keyup', () => {
   results = [];
   performSearch(search, data);
   showPage(results, 1);
   addPagination(results);
   const studentList = document.querySelector('.student-list');
   if (results.length === 0) {
      const alert = `
      <li class = "student-item cf>
         <div class= "no-results">
            <h3>Your search returned zero results</h3>
         </div>
      </li>
      `;
      studentList.insertAdjacentHTML('beforeend', alert);
   }
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = "";
   for (let i=0; i<list.length; i++) {
      if (i>=startIndex && i<endIndex) {
         // generate HTML using template literal and store it in variable studentCard
         const studentCard = `
            <li class = "student-item cf">
               <div class= "student-details">
                  <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class= "joined-details">
                  <span class= "date">Joined ${list[i].registered.date}</span>   
               </div>
            </li>`;
          studentList.insertAdjacentHTML('beforeend', studentCard);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // calculate number of pages by dividing length of data set by desired display parameter
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   // loop through calculated numOfPages and generate HTML for each button
   for (let i=1; i<=numOfPages; i++) {
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
         `;
      linkList.insertAdjacentHTML('beforeend', button)
   }
   // select first button and assign it the 'active' class attribute
   const activeButton = document.querySelector('button');
      activeButton.className = "active";
   // click eventListener assigns 'active' class to the target button
   // and removes the same class from the previously active button
   // it also calls the showPage function to display the next set of students
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const element = document.querySelector('.active');
         element.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   })
}

// Call functions
showPage(data, 1);
addPagination(data);

