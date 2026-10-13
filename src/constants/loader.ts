export const LOADED_KEY = "rexpo-loaded";

export const LOADED_CHECK_SCRIPT = `try{if(sessionStorage.getItem("${LOADED_KEY}"))document.documentElement.dataset.loaded=""}catch(e){}`;
