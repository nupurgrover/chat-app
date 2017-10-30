import * as React from 'react';

type Props = {
  count: number,
};

class Counter extends React.Component<Props> {
  render() {
    return <div>{this.props.count}</div>;
  }
}

export default Counter;
