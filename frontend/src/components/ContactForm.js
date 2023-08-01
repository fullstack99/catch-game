import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const ContactForm = ({ label, onClose, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      onSubmit(val);
    },
  });

  return (
    <div className="form-wrapper">
      <form onSubmit={formik.handleSubmit} noValidate className="form">
        <div className="form">
          <div className="flex flex-col mb-4">
            <label className="text-black text-sm font-semibold mb-2" id="name">
              Name
            </label>
            <input
              id="name"
              className="rounded-lg border p-2"
              type="text"
              placeholder="First Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <button
              type="submit"
              className="btn bg-green-600 text-white rounded-lg hover:bg-green-400 px-4 py-2 w-1/3 disabled:bg-slate-300"
              disabled={
                formik.isSubmitting || !formik.isValid || !formik.touched
              }
            >
              Submit
            </button>
            <button
              className="btn bg-blue-500 text-white rounded-lg hover:bg-blue-400 px-4 py-2 w-1/3"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
