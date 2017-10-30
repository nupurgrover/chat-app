import * as React from 'react';

type Props = {
  count:number,
}

class TextInput extends React.Component<Props> {
  render () {
    return (
      <input type="text"></input>
    )
  }
}

export default TextInput;
