//base class with utility functions for menu objects

class Menu {
    constructor(){

    }

    _toggleVisibility(element){
        //receives reference to element, toggles visibility
        element.id = (element.id !== "show") ? "show" : "no-show";
    }

    showMenu(menuElement, titleElement){
        //receives menu and title elements, toggles background and menu visibility
        const backBoxElement = document.querySelector(".backBox");
        [menuElement, titleElement, backBoxElement].forEach( ele => {
            this._toggleVisibility(ele);
        });
    }

}