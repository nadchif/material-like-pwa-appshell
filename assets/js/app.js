'use strict'

function WebApp() {
    let a = 1;
    const navBarToggles = document.querySelectorAll(".navButton");
    const customURLLinks = document.querySelectorAll("[data-url-link]");
    const navMenu = document.querySelector(".navMenu");
    const navMenuUnderlay = document.querySelector(".navMenuUnderlay");
    const snackbar = document.getElementById("appSnackbar");
    const progressBar = document.getElementById("appProgressbar");
    const appDialog = document.getElementById("appDialog");
    const appDialogMsg = document.getElementById("appDialogMsg");
    const contentScreen = document.getElementById("contentScreen");
    const fabBtn = document.getElementById("appFAB");

    //the lines below are for use in the demo only
    const snackBtn = document.getElementById("snackBtn");
    const alertBtn = document.getElementById("alertBtn");
    const fetchBtn = document.getElementById("fetchBtn");
    //end elements for demo use;

    const loadUrl = (url) => {
        window.location = (url);
    }

    const showProgressBar = () => {
        if (!progressBar.classList.contains("show")) {
            progressBar.classList.add("show");
        }
    }
    const hideProgressBar = () => {
            progressBar.classList.remove("show");
    }
    const showAlertBox = (msg, title = "Message") => {
        appDialogMsg.textContent = msg;
        if (!appDialog.classList.contains("show")) {
            appDialog.classList.add("show");
        }


    }
    const hideAlertBox = () => {
            appDialog.classList.remove("show");
    }
    const fetchData = (url) => {
        showProgressBar();
        fetch(url)
        .then(response => {
            hideProgressBar();
            if (response.status == 200) {
                return response.json();
            } else {
                throw ("Did not receive 200");
            }
        })
        .then(data=>{
            console.log(data);
            /*

        <div class="todoCard">
          <div class="cardTitle">Todo 2</div>
          <div class="cardCheckBox checked"></div>
          */
         contentScreen.innerHTML = '';

            data.forEach(entry => {
                let card = document.createElement("div");
                let cardtitle = document.createElement("div");
                let checkbox = document.createElement("div");
                checkbox.classList = "cardCheckBox";
                if(entry['completed'] === true){
                    checkbox.classList.add("checked");
                }
                cardtitle.className = "cardTitle";
                cardtitle.textContent = entry['title'];
                card.className = "todoCard";
                card.appendChild(cardtitle);
                card.appendChild(checkbox);
                contentScreen.appendChild(card);
            })

        })
        .catch(e => {
            hideProgressBar();
            console.log(e);
            showSnackBar(`Error: ${e}`);
        });
    }
    const showSnackBar = (msg) => {
        snackbar.textContent = msg;
        snackbar.className = "show";
        setTimeout(() => {
            snackbar.className = snackbar.className.replace("show", "");
            snackbar.textContent = '';
        }, 3000);
    }
    const toggleNavMenu = () => {

        if (!navMenu.classList.contains("slide-in")) {
            navMenu.classList.add("slide-in");
            navMenu.classList.remove("slide-out");
            navMenuUnderlay.classList.add("show");
        } else {
            navMenu.classList.add("slide-out");
            navMenu.classList.remove("slide-in");
            navMenuUnderlay.classList.remove("show");
        }

    }
    const setUpListeners = () => {
        navBarToggles.forEach((listener) => {
            listener.addEventListener("click", toggleNavMenu);
        });
        customURLLinks.forEach((listener) => {
            listener.addEventListener("click", (e)=>{
                showProgressBar();
                toggleNavMenu();
               loadUrl(e.currentTarget.getAttribute("data-url-link"));
            });
        });

        navMenuUnderlay.addEventListener("click", toggleNavMenu);
        fabBtn.addEventListener("click", ()=>{
            showAlertBox("You clicked FAB");
        });


    const dialogCloseBtns = document.querySelectorAll("#appDialog .closeBtn");
    dialogCloseBtns.forEach(button => {
        button.addEventListener("click", (e)=>{
            hideAlertBox();
        });
    })

        //the lines below are to setup event listeners for use in the demo only
        snackBtn.addEventListener("click", () => {
            showSnackBar("Hello world from Navigation Menu Item");
            toggleNavMenu();
        });        
        alertBtn.addEventListener("click", () => {
            showAlertBox("Hello world from Navigation Menu item!");
            toggleNavMenu();
        });

        fetchBtn.addEventListener("click", ()=>{
            toggleNavMenu();
            fetchData("https://jsonplaceholder.typicode.com/todos");
        });
        //end lines for demo
    }
    return function () {
        setUpListeners();
    }
};

WebApp()();