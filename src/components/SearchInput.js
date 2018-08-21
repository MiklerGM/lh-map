import React from 'react';
import Select, { Option } from 'rc-select';
import { FormattedMessage } from 'react-intl';

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
          style={{ width: '300px' }}
          onSelect={e => this.props.cb(e)}
          notFoundContent=""
          dropdownMenuStyle={{ maxHeight: 300 }}
          placeholder='Placeholder'
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
          {Object.keys(this.props.selected)
            .filter(key => !this.props.selected[key])
            .map(i => (
              <Option value={i} key={i} text={String(i)}>
                <FormattedMessage id={`${i}.full`} />
              </Option>
            ))
          }
        </Select>
      </div>
    );
  }
}

export default SearchInput;
