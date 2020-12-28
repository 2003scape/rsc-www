import ReactPaginate from 'react-paginate';
import ArrowLink from './arrow-link';
import Router from 'next/router';

export default function PaginationArrows({
    url,
    page = 1,
    totalPages,
    query = {},
    hash = ''
}) {
    page -= 1;

    const getHref = (page) => {
        let postURL = `?page=${page}`;

        if (Object.keys(query).length) {
            postURL += `&${new URLSearchParams(query).toString()}`;
        }

        if (hash.length) {
            postURL += `#${hash}`;
        }

        return `${url}${postURL}`;
    };

    const backHref = page > 0 ? getHref(page) : undefined;
    const nextHref = page + 2 <= totalPages ? getHref(page + 2) : undefined;

    const onPageChange = ({ selected }) => {
        if (selected === page) {
            return;
        }

        Router.push({
            pathname: url,
            query: { ...query, page: selected + 1 },
            hash
        });

        window.scrollTo(0, 0);
    };

    const onBlur = (event) => {
        onPageChange({ selected: Number(event.target.value) - 1 });
    };

    return (
        <div>
            <ReactPaginate
                key={page}
                disableInitialCallback={true}
                previousLabel=""
                nextLabel=""
                breakLabel="..."
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName="rsc-pagination rsc-inline-links"
                activeClassName="rsc-disabled"
                disabledClassName="rsc-disabled"
                previousLinkClassName="rsc-arrow rsc-arrow-back"
                nextLinkClassName="rsc-arrow"
                hrefBuilder={getHref}
                initialPage={page}
            />
            <div className="rsc-row rsc-pagination-row">
                <div className="rsc-col rsc-col-25">
                    <ArrowLink
                        direction="back"
                        href={backHref}
                        title="Previous page"
                        disabled={page <= 0}
                    />
                </div>
                <div
                    className="rsc-col rsc-col-50"
                    style={{ textAlign: 'center' }}
                >
                    <input
                        key={page}
                        className="rsc-input"
                        style={{ width: '100%' }}
                        type="number"
                        defaultValue={page + 1}
                        min="1"
                        max={totalPages}
                        onBlur={onBlur}
                    />
                </div>
                <div className="rsc-col rsc-col-25">
                    <ArrowLink
                        href={nextHref}
                        title="Next page"
                        disabled={page + 1 >= totalPages}
                    />
                </div>
            </div>
        </div>
    );
}
