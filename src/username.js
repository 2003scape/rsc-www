export const USERNAME_REGEX = '([A-Z]|[a-z]|[0-9]| ){3,12}';

export function formatUsername(username) {
    username = username.toLowerCase();

    if (username.length) {
        return username[0].toUpperCase() + username.slice(1);
    }

    return '';
}
