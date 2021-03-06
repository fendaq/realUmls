import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import memberValidation, { userRoles } from './memberValidation';
import * as widgetActions from 'redux/modules/rooms';

@connect(
  state => ({
    saveError: state.widgets.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'member',
  fields: ['email', 'role'],
  validate: memberValidation
})
export default class MemberForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStop, fields: {email, role}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/App/App.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
       {/* <td className={styles.idCol}>{id.value}</td>*/}
        <td className={styles.ownerCol}>
          <input type="text" className="form-control" {...email}/>
          {email.error && email.touched && <div className="text-danger">{email.error}</div>}
        </td>
        <td className={styles.colorCol}>
          <select name="color" className="form-control" {...role}>
            {userRoles.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {role.error && role.touched && <div className="text-danger">{role.error}</div>}
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
