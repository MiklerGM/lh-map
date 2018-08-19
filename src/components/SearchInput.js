import React from 'react';
import Select, { Option } from 'rc-select';

// import langData from '../../data/lang.json';

class SearchInput extends React.Component {
  state = {
    disabled: false,
    value: '',
  };

  render() {
    return (
      <div>
        <Select
          disabled={this.state.disabled}
          style={{ width: '400px' }}
          onSelect={v => this.props.cb({ [v]: true })}
          notFoundContent=""
          dropdownMenuStyle={{ maxHeight: 300 }}
          placeholder='placeholder'
          value={this.state.value}
          // backfill
          // labelInValue
          // animation="slide-up"
          // optionLabelProp="children"
          // multiple
          // onSearch={this.fetchData}
          // onChange={this.onChange}
          // filterOption={false}
        >
          {Object.keys(this.props.selectedLang)
            .filter(key => !this.props.selectedLang[key])
            .map((i) => {
            return <Option value={i} key={i} text={String(i)}> { i } </Option>;
          })
          }
        </Select>
      </div>
    );
  }
}

export default SearchInput;
