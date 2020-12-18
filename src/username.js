export function formatUsername(username) {
    username = username.toLower();
    return username[0].toUpperCase() + username.slice(1);
}
