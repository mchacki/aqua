import React from 'react';
import ReactDOM from 'react-dom';
import { NavMenu } from './ui/navigation';

import '../style/App.scss';
import { AnalysisProvider } from './ui/analysis';
import { QueryList } from './ui/query';
import { TooltipProvider, Tooltip, PinnedView } from './ui/tooltip';

const Index = () => {
    return <>
        <TooltipProvider>
            <AnalysisProvider>
                <NavMenu />
                <QueryList />
            </AnalysisProvider>
            <Tooltip></Tooltip>
            <PinnedView></PinnedView>
        </TooltipProvider>
    </>;
};

ReactDOM.render(<Index />, document.getElementById('app'));