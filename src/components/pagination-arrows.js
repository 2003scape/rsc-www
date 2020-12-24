import ArrowLink from './arrow-link';

export default function PaginationArrows({ url, postURL, page, totalPages }) {
    postURL = postURL || '';

    const backHref = page > 1 ? `${url}?page=${page - 1}${postURL}` : undefined;

    const nextHref =
        page < totalPages ? `${url}?page=${page + 1}${postURL}` : undefined;

    return (
        <div className="rsc-arrow-wrap">
            <ArrowLink
                direction="back"
                href={backHref}
                disabled={page <= 1}
                title="Previous page"
            />
            <ArrowLink
                href={nextHref}
                disabled={page >= totalPages}
                title="Next page"
            />
            <div style={{ clear: 'both' }} />
        </div>
    );
}
