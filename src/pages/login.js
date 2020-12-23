import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';
import UsernameInput from '../components/username-input';

const PAGE_TITLE = 'Secure Login';

export default function Login(props) {
    const askLogin = props.askLogin ? (
        <p>
            <strong class="rsc-caution-text">
                You need to login to access this feature
            </strong>
        </p>
    ) : undefined;

    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div class="rsc-row">
                    <div className="rsc-col rsc-col-75">
                        <div className="rsc-box">
                            {askLogin}
                            <p>
                                Never enter your password anywhere except
                                2003scape.com
                            </p>
                            <img
                                className="rsc-img"
                                src="/only-2003scape.gif"
                                alt="Only enter your password on 2003scape.com"
                            />
                            <form action="/login">
                                <div className="rsc-row">
                                    <label
                                        htmlFor="username"
                                        className="rsc-col rsc-col-50 rsc-form-label"
                                    >
                                        2003Scape Username:
                                    </label>
                                    <div className="rsc-col rsc-col-50">
                                        <UsernameInput
                                            name="username"
                                            id="username"
                                        />
                                    </div>
                                </div>
                                <div className="rsc-row">
                                    <label
                                        htmlFor="password"
                                        className="rsc-col rsc-col-50 rsc-form-label"
                                    >
                                        2003Scape Password:
                                    </label>
                                    <div className="rsc-col rsc-col-50">
                                        <input
                                            className="rsc-input"
                                            name="password"
                                            id="password"
                                            type="password"
                                            maxLength="20"
                                            minLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                                <input
                                    className="rsc-input"
                                    type="submit"
                                    value="Secure Login"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
