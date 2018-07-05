import { PureComponent } from 'react';

interface IProps {
    onProductError: (error: Error) => void;
}

export default class ProductErrorBoundary extends PureComponent<IProps> {
    public componentDidCatch(error: Error) {
        this.props.onProductError(error);
    }

    public render() {
        return this.props.children;
    }
}
