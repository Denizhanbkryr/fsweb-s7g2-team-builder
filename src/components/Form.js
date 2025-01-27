const Form = ({ changeHandler, submitHandler, formData, isValid, errors }) => {
  return (
    <form onSubmit={submitHandler}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={changeHandler}
        />
      </label>
      <div className="text-danger">{errors.name}</div>
      <label>
        email:
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={changeHandler}
        />
      </label>
      <div className="text-danger">{errors.email}</div>
      <label>
        rol:
        <input
          type="text"
          name="rol"
          placeholder="role"
          value={formData.role}
          onChange={changeHandler}
        />
      </label>
      <div className="text-danger">{errors.role}</div>
      <label>
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={changeHandler}
        />
        Şartları kabul ediyorum.
      </label>
      <div className="text-danger">{errors.terms}</div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default Form;
