import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import "../node_modules/bootstrap/scss/bootstrap.scss";
import '../style/App.scss';

const Index = () => {
    return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('app'));