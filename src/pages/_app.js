import '../../styles/globals.css';
import UserContextProvider from '../contexts/user';

function App({ Component, pageProps, props }) {
    return (
        <UserContextProvider test={props.test}>
            <Component {...pageProps} />
        </UserContextProvider>
    );
}

App.getInitialProps = async function ({ ctx: { req } }) {
    console.log(req);
    return { props: { test: 'farts' } };
};

export default App;
