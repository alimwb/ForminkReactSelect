import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field } from "formik";
import Select from "react-select";


const Example = () => (
  <div>
    <Formik
      initialValues={{
        email: "",
        color: "green",
        firstName: "",
        secondColor: {
          value: "red",
          label: "Red"
        }
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field type="email" name="email" placeholder="Email" />
          <Field component="select" name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <Field name="firstName" component={CustomInputComponent} />
          <Field
            name="lastName"
            render={({ field /* _form */ }) => (
              <input {...field} placeholder="lastName" />
            )}
          />
          <Field name="secondColor" component={SelectWrapper} />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  </div>
);

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <input type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" }
];

const SelectWrapper = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Select
    options={colourOptions}
    value={field.value}
    onChange={selectedValue => {
      console.log(selectedValue);
      console.log(field.name);
      console.log(handleChange);
      handleChange({
        target: {
          value: selectedValue,
          name: field.name
        }
      });
    }}
    {...props}
  />
);

function App() {
  return (
    <div className="App">
      <h1>Formink + ReactSelect</h1>
      <h2>Watch how to mix formic and react-select</h2>
      <Example />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
