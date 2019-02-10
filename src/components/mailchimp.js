import React, { Component } from "react";
import cx from "classnames";
import addToMailchimp from "gatsby-plugin-mailchimp";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import style from "./mailchimp.module.scss";

class Mailchimp extends Component {
  state = {
    email: "",
    submitting: false
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ submitting: true });

    const response = await addToMailchimp(this.state.email);
    console.log(response);

    this.setState({
      ...response,
      submitting: false
    });

    if (response.result === "success") {
      this.setState({ email: "" });
    }
  };
  render() {
    const { title } = this.props;
    const { email, submitting, msg, result } = this.state;
    const success = result === "success";
    const error = result === "error";

    const msgClass = cx(style.message, {
      [style.success]: success,
      [style.error]: error
    });
    return (
      <div className={style.mailchimp}>
        {title && <h3>{title}</h3>}
        <form className={style.form} onSubmit={e => this.handleSubmit(e)}>
          <fieldset disabled={submitting}>
            <div className={style.inputs}>
              <input name="email" value={email} placeholder="Enter your email address" onChange={this.saveToState} />
              <button type="submit">
                <FaPaperPlane />
              </button>
            </div>
          </fieldset>
        </form>
        {msg && (
          <div className={msgClass}>
            {success && <FaCheckCircle />}
            {error && <FaExclamationCircle />}
            <p dangerouslySetInnerHTML={{ __html: msg }} />
          </div>
        )}
      </div>
    );
  }
}

export default Mailchimp;
