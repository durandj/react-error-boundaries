import { PureComponent, ReactNode } from 'react';

interface IProps {
    fallback: ReactNode,
}

interface IState {
    error: null | Error;
}

export default class ErrorBoundary extends PureComponent<IProps, IState> {
    public state = {
        error: null,
    };

    public componentDidCatch(error: Error) {
        this.setState({ error });
    }

    public render() {
        if (this.state.error) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
