//URL取得
const currentUrl = new URL(window.location.href);
if (currentUrl.href.includes("stg")) {
  const classElement = document.getElementsByClassName("prod");
  classElement[0].className = "stg";
} else if (currentUrl.href.includes("dev")) {
  const classElement = document.getElementsByClassName("prod");
  classElement[0].className = "dev";
}
