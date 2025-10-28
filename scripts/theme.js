const theme = localStorage.getItem("theme")

themePage(theme);

export function themePage(theme){
    if(theme=="sombre"){
        $('html').attr('data-bs-theme', 'dark');
    } else {
        $('html').attr('data-bs-theme', 'light');
    }
}