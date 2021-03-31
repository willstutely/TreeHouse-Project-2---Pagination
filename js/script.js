/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



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
            <li class = "student-item cf>
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
