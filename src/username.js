export const USERNAME_REGEX = '([A-Z]|[a-z]|[0-9]| ){3,12}';

export function formatUsername(username) {
    if (username && username.length) {
        username = username.trim().toLowerCase();
        return username[0].toUpperCase() + username.slice(1);
    }

    return '';
}
