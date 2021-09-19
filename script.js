// Listen for form submit.
let form = document.getElementById('form');
form.addEventListener('submit', saveBookmark);



// form function
function saveBookmark(e){
    
    // Get form values
   let webName = document.getElementById('webName').value;
   let webUrl = document.getElementById('webUrl').value;

    var bookmark = {
        name: webName,
        url: webUrl
    }

    if(!validateForm(webName, webUrl)){
        return false;

    }

    // Validate input availability so it doesn't save empty bookmarks
   
      

    // LocalStorage
    // lcoalStorage.setItem(keyword, value); to add to local storage
    // loalStorage.getItem(keyword); - to get item from local storage
    // loalStorage.removeItem(keyword); - to remove item from local storage
    // JSON.parse will turn a string to JSON. JSON..stringigy will turn Json to string.

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);

        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmark from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    }

     // Prevent default method of the submit button
  

//                  My trial
//     div = document.createElement('div');
//     div.classList.add('bookmarks'); 
//     div.innerHTML =
//    siteList = document.getElementById('siteList');
//    siteList.appendChild(div);
        document.getElementById('form').reset();
//     document.getElementById('delete').addEventListener('click', () => {
//         e.target.previousElementSibling.remove();
//     })
//     localStorage.setItem('div', JSON.stringify(div));
        fetchBookmarks();
        e.preventDefault();

}



// Delete Bookmark
function deleteBookmark (url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
       if(bookmarks[i].url = url){
            bookmarks.splice(i, 1)
       }
        
    }
     // Reset back to localstorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
     fetchBookmarks();
}

// Get Bookmarks
function fetchBookmarks (){
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   var bookmarksList = document.getElementById('bookmarksList');

    bookmarksList.innerHTML = '';
    // loop through each bookmark in local storage and get output into html content
    for(var i = 0; i < bookmarks.length; i++){
       var name = bookmarks[i].name;
       var url = bookmarks[i].url;

        bookmarksList.innerHTML +=  `
            <div class="bookmarks">
            <h3 class="web-name">${name}
           <a class="btn-sm  btn-white" target="_blank" href="${url}">Visit</a>
            <a  href="#" onclick="deleteBookmark(\'${url}\')" class="btn-sm btn-danger" id="delete">Delete</a>
            </h3>     
            </div>
            `;
    }

}

function validateForm(webName, webUrl){
    if (!webName || !webUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!webUrl.match(regex)) {
        alert("Please enter a valid URL");
        return false;
      }

      return true;
}



