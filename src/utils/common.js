export function capitalizeFirstLetter(string) {
    if (!string || string === "" || typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}