import { List as ImmutableList } from 'immutable';
import * as React from 'react';
import { PureComponent } from 'react';
import { Store, Unsubscribe } from 'redux';
import styled from 'styled-components';

import withErrorBoundary from './withErrorBoundary';

export const messageProviderLocalStorageKey = 'counter__provider';

function getPreviousMessages(): ImmutableList<string> {
    const rawJSON = localStorage.getItem(messageProviderLocalStorageKey);
    if (!rawJSON) {
        return ImmutableList<string>([] as string[]);
    }

    return ImmutableList<string>(JSON.parse(rawJSON));
}

function getMessageForCount(count: number): null | string {
    switch (count) {
        case 1:
            return 'Good start...';
        case 2:
            return 'OK, getting somewhere';
        case 4:
            return 'I like where this is going';
        case 8:
            return 'Moving fast!';
    }

    return null;
}

const List = styled.ul`
    margin: 0;
    list-style: none;
`;

interface IProps {
    store: Store;
}

interface IState {
    messages: ImmutableList<string>;
}

export class MessageProvider extends PureComponent<IProps, IState> {
    public state = {
        messages: getPreviousMessages(),
    };

    private unsubscribe: null | Unsubscribe;

    public onStoreChange = () => {
        const state = this.props.store.getState();
        const message = getMessageForCount(state.count);

        if (!message) {
            return;
        }

        this.setState(
            { messages: this.state.messages.push(message) },
            () => {
                localStorage.setItem(
                    messageProviderLocalStorageKey,
                    JSON.stringify(this.state.messages.toArray()),
                )
            },
        );
    };

    public onReload = () => {
        this.setState({ messages: getPreviousMessages() });
    };

    public onClear = () => {
        localStorage.removeItem(messageProviderLocalStorageKey);
        this.setState({ messages: ImmutableList<string>([] as string[]) });
    };

    public componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(this.onStoreChange);
    }

    public componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    public render() {
        return (
            <div>
                {this.props.children}
                <List>
                    {this.state.messages.slice(-10).map((message) => (
                        <li key={message}>{message}</li>
                    ))}
                </List>
                <button onClick={this.onReload}>Reload</button>
                <button onClick={this.onClear}>Clear</button>
            </div>
        );
    }
}

export default withErrorBoundary(MessageProvider);
