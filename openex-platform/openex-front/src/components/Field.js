import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUITextField from '@material-ui/core/TextField';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import CKEditor4 from 'ckeditor4-react';

const styles = {
  global: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 5,
  },
  richText: {
    header: {
      fontSize: 12,
      opacity: 0.6,
      marginBottom: 8,
      marginTop: 8,
    },
    content: {
      color: 'black',
    },
  },
  minHeight: {
    minHeight: '300px',
  },
};

const renderTextField = ({
  input,
  label,
  fullWidth,
  multiLine,
  rows,
  type,
  placeholder,
  onFocus,
  onClick,
  meta: { touched, error },
}) => (
  <MUITextField
    placeholder={placeholder}
    label={label}
    floatingLabelFixed={false}
    errorText={touched && error}
    style={styles.global}
    inputStyle={styles.input}
    fullWidth={fullWidth}
    multiLine={multiLine}
    rows={rows}
    type={type}
    onFocus={onFocus}
    onClick={onClick}
    {...input}
  />
);

renderTextField.propTypes = {
  input: PropTypes.object,
  fullWidth: PropTypes.bool,
  multiLine: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  meta: PropTypes.object,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export const FormFieldIntl = (props) => (
  <Field
    name={props.name}
    label={
      props.label ? props.intl.formatMessage({ id: props.label }) : undefined
    }
    placeholder={
      props.placeholder
        ? props.intl.formatMessage({ id: props.placeholder })
        : undefined
    }
    fullWidth={props.fullWidth}
    multiLine={props.multiLine}
    rows={props.rows}
    type={props.type}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onClick={props.onClick}
    onChange={props.onChange}
    component={renderTextField}
  />
);

export const FormField = injectIntl(FormFieldIntl);

FormFieldIntl.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  intl: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  multiLine: PropTypes.bool,
  rows: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

class renderCKEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);

    // Get ckeditor file locally:
    CKEditor4.editorUrl = '/ckeditor/ckeditor.js';
    // Default location:
    // CKEditor4.editorUrl = 'https://cdn.ckeditor.com/4.11.4/full/ckeditor.js'
  }

  onEditorChange(evt) {
    this.setState({ value: evt.editor.getData() });
    this.props.input.onChange(evt.editor.getData().toString('html'));
  }

  handleChange(changeEvent) {
    this.setState({ value: changeEvent.target.value });
  }

  render() {
    return (
      <div style={styles.minHeight}>
        <CKEditor4
          data={this.props.input.value}
          onChange={this.onEditorChange}
        />
      </div>
    );
  }
}

renderCKEditor.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
};

const CKEditorFieldIntl = (props) => (
  <Field
    name={props.name}
    label={props.intl.formatMessage({ id: props.label })}
    component={renderCKEditor}
  />
);

CKEditorFieldIntl.propTypes = {
  intl: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const CKEditorField = injectIntl(CKEditorFieldIntl);
