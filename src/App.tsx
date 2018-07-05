import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';

import Counter from './Counter';
import MessageProvider from './MessageProvider';
import { reducer } from './state';

const store = createStore(reducer);

class App extends React.Component {
    public render() {
        return (
            <ReduxProvider store={store}>
                <MessageProvider store={store}>
                    <Counter />
                </MessageProvider>
            </ReduxProvider>
        );
    }
}

export default App;
