import React from 'react';
import ReactDOM from 'react-dom';
import { NavMenu } from './ui/navigation';

import '../style/App.scss';
import { AnalysisProvider } from './ui/analysis';
import { QueryList } from './ui/query';

const Index = () => {
    return <>
        <AnalysisProvider>
            <NavMenu />
            <QueryList />
        </AnalysisProvider>
    </>;
};

ReactDOM.render(<Index />, document.getElementById('app'));