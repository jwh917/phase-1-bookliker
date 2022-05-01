document.addEventListener("DOMContentLoaded", function() {
  
  fetchBooks()

})

const booksUrl = "http://localhost:3000/books"

const listId = document.getElementById("list")

const showPanel = document.getElementById("show-panel")

function fetchBooks(){

  fetch(booksUrl)
    .then(response => response.json())
    .then(data => {

      // console.log(data)

      renderlist(data)

      // render books info

      renderBooksInfo(data)
    
    })
}

function renderlist(bookInfo){

  bookInfo.forEach((element) => {
        
    // console.log(element.id)
    // console.log(element.title)

    // title list 
    let bookTitle = document.createElement("li")
    bookTitle.innerHTML = element.title
    listId.appendChild(bookTitle)
      
  })

}


function renderBooksInfo(bookInfo){
  // render books info
  // first make sure div is clear

  // event listner for title list
      document.getElementById("list").addEventListener("click",function(e) {
        if(e.target && e.target.nodeName == "LI") {
            // console.log(e.target.innerHTML + " was clicked")
        }

        showPanel.innerHTML = ""

        let showBookInfo = []
        
        bookInfo.forEach(element => {
          // console.log(element)
          // console.log(element.title)
          if(element.title === e.target.innerHTML){

            // console.log(element.id)
            // console.log(element.subtitle)
            // console.log(element.description)

            showBookInfo.push(element.title, element.subtitle, element.description, element.author, element.img_url, element.users, element.id)

          }
        })

        console.log(showBookInfo)

        let bookImg = document.createElement("img")
        bookImg.src = showBookInfo[4]
        // document.getElementById("show-panel").appendChild(bookImg)
        showPanel.appendChild(bookImg)

        let bookTitleH = document.createElement("h1")
        let bookSubTitleH = document.createElement("h1") 
        let bookDesP = document.createElement("p")
        let bookAurH = document.createElement("h1")

        bookTitleH.innerHTML = showBookInfo[0]
        bookSubTitleH.innerHTML = showBookInfo[1]
        bookDesP.innerHTML = showBookInfo[2]
        bookAurH.innerHTML = showBookInfo[3]

        showPanel.appendChild(bookTitleH)
        showPanel.appendChild(bookSubTitleH)
        showPanel.appendChild(bookAurH)
        showPanel.appendChild(bookDesP)

        console.log(showBookInfo[5])
        // console.log(showBookInfo[5][1])
      
        let userList = document.createElement("ul")
        userList.setAttribute("id", "user-list")

        let likeButton = document.createElement("button")
        likeButton.innerHTML = "LIKE"
        likeButton.setAttribute("id", "like-button")

        showBookInfo[5].forEach(element => {
          // console.log(element)
          let userName = document.createElement("li")
          userName.innerHTML = element.username
          userList.appendChild(userName)
        })

        userList.appendChild(likeButton)
        showPanel.appendChild(userList)

        likeButtonFuncs(showBookInfo)

    })


  
}

function likeButtonFuncs(bookInfo){

  console.log(bookInfo)
  console.log(bookInfo[6]-1)

  let bookId = bookInfo[6]


  let likeButtonID = document.getElementById("like-button")

  likeButtonID.addEventListener("click", function(){

    fetch(`${booksUrl}/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"},
        body: JSON.stringify({

          "users": [
            ...bookInfo[5],
            {
              "id": 1,
              "username": "pouros"
            }
        ]

        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        console.log('Success:', data.users)


        const showPanelUl = document.getElementById("user-list")
        
        const likeButton = document.getElementById("like-button")

        showPanelUl.innerHTML = ""

        data.users.forEach(element => {
          let userName = document.createElement("li")
          userName.innerHTML = element.username
          showPanelUl.appendChild(userName)
        })

        showPanelUl.appendChild(likeButton)
        likeButtonID.innerHTML = "UNLIKE"
        likeButton.setAttribute("id", "unlike-button")


      })

  })

}

// function unlikeButtonFuncs(bookInfo){

//   const unlikeButton = document.getElementById("unlike-button")

//   unlikeButton.addEventListener("click", function(){


//   let bookId = bookInfo[6]


//     fetch(`${booksUrl}/${bookId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"},
//         body: JSON.stringify({

//           "users": [
//             ...bookInfo[5]
//         ]

//         }),
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data)

//         const showPanelUl = document.getElementById("user-list")
        

//         showPanelUl.innerHTML = ""

//         data.users.forEach(element => {
//           let userName = document.createElement("li")
//           userName.innerHTML = element.username
//           showPanelUl.appendChild(userName)
//         })

//         showPanelUl.appendChild(unlikeButton)
        
      
//       })


//     unlikeButton.innerHTML = "LIKE"


//   })
// }



