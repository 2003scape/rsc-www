export function formatUsername(username) {
    username = username.toLowerCase();
    return username[0].toUpperCase() + username.slice(1);
}
