import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { IStoreState, IUpdateCountAction, updateCount } from './state';

const Container = styled.div`
    margin: 4px;
`;

const CountDisplay = styled.span`
    display: inline-block;
    margin-left: 4px;
`;

export const counterUnmountLocalStorageKey = 'counter__unmount';

interface IProps {
    count: number;
    updateCount: (count: number) => IUpdateCountAction;
}

export class Counter extends PureComponent<IProps> {
    public onClick = () => {
        const { count } = this.props;

        this.props.updateCount(count + 1);
    };

    public componentWillUnmount() {
        const unmountCount = parseInt(localStorage.getItem(counterUnmountLocalStorageKey) || '0', 10);
        localStorage.setItem(counterUnmountLocalStorageKey, (unmountCount + 1).toString());
    }

    public render() {
        const { count } = this.props;
        if (count >= 10) {
            throw new Error(`Unsupported number ${count}`);
        }

        return (
            <Container>
                <button onClick={this.onClick}>Click me</button>
                <CountDisplay>{this.props.count}</CountDisplay>
            </Container>
        );
    }
}

function mapStateToProps(state: IStoreState) {
    return {
        count: state.count,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
        {
            updateCount,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
