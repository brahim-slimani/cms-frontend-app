import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Error boundary", error);
        console.log("Error info", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="my-2 mx-5">
                <h1>
                    <i className="bi bi-exclamation-triangle" />
                </h1>
                <h6>Sorry, something went wrong !</h6>
                <small>We're working on getting this fixed as soon as we can.</small>
                <br />
                <a href={window.location.pathname} >Go back</a>
                <hr />
                <small>Copyright &copy; {new Date().getFullYear()}. PoliScrypts IT Consulting <a href={`mailto:contact@poliscrypts.be`} >Contact</a> </small>
            </div>
        }

        return this.props.children;
    }
}