import * as React from 'react';
import { ComponentClass, PureComponent } from 'react';

import ErrorBoundary from './ErrorBoundary';
import ProductErrorBoundary from './ProductErrorBoundary';

interface IState {
    productError: null | Error;
}

export default function withErrorBoundary<Props extends {}>(
        WrappedComponent: ComponentClass<Props>
) {
    return class extends PureComponent<Props, IState> {
        public state = {
            productError: null,
        };

        public onProductError = (error: Error) => {
            this.setState({ productError: error });
        };

        public render() {
            const { productError } = this.state;
            if (productError) {
                throw productError;
            }

            const { children } = this.props;

            return (
                <ErrorBoundary fallback={children}>
                    <WrappedComponent {...this.props}>
                        <ProductErrorBoundary onProductError={this.onProductError}>
                            {children}
                        </ProductErrorBoundary>
                    </WrappedComponent>
                </ErrorBoundary>
            );
        }
    }
}
