export default function formatDate(date) {
    return date
        .toLocaleString('en-gb', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        .replace(/ /g, '-')
        .replace(/,/g, '');
}
