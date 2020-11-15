import React from 'react';
import { Field, reduxForm, formValues } from 'redux-form';
import { ReactMultiCrop } from '@berviantoleo/react-multi-crop';

let MultiCropForm = props => {
  const { handleSubmit } = props
  return (<form onSubmit={handleSubmit}>
    <div>
      <label>Image Source</label>
      <div>
        <Field name="image" component="input" type="text" placeholder="Image Location" />
      </div>
      <Field name="react-crop" component={formValues({ image: 'image' })(ReactMultiCrop)} />
    </div>
  </form>)
}

MultiCropForm = reduxForm({
  // a unique name for the form
  form: 'crop'
})(MultiCropForm);

export default MultiCropForm;
