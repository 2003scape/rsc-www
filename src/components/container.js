export default function Container(props) {
    return (
        <div className="rsc-container">
            <div className="rsc-border-top rsc-border-bar"></div>
            <div className="rsc-wrap">{props.children}</div>
            <footer className="rsc-footer">
                This webpage and its contents is copyright 2003 Jagex Ltd
                <br />
                <a className="rsc-link" href="https://github.com/2003scape">
                    2003scape source code
                </a>
                &nbsp; - Licensed under the&nbsp;
                <a
                    className="rsc-link"
                    href="https://www.gnu.org/licenses/agpl-3.0.html"
                >
                    AGPL-3.0+
                </a>
            </footer>
            <div className="rsc-border-bottom rsc-border-bar"></div>
        </div>
    );
}
