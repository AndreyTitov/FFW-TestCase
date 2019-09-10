/* Set variables */

var tabsLink;
var tabsContent;
var main = document.getElementById('main');


/* Get Tabs and TabsContent also hiding Tabs */

window.onload = function () {
    tabsLink = document.querySelectorAll('.header-nav__link');
    tabsContent = document.querySelectorAll('.tab-content');
    hideTabs(1);
}

/* Hiding tabs */

function hideTabs(a) {
    for(var i = a; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove('open');
        tabsContent[i].classList.add('close');
        tabsLink[i].classList.remove('active');
    }
}

/* Finding a current Tab and show content */

main.onclick = function(e) {
    var target = e.target;
    if(target.className == 'header-nav__link') {
        for(var i = 0; i < tabsLink.length; i++) {
            if(target == tabsLink[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
};

/* Show TabsContent */

function showTabsContent(b) {
    if(tabsContent[b].classList.contains('close')) {
        hideTabs(0);
        tabsLink[b].classList.add('active');
        tabsContent[b].classList.remove('close');
        tabsContent[b].classList.add('open');
    }
}