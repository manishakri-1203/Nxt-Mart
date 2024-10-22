import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {HiOutlineUserCircle} from 'react-icons/hi2'
import {HiOutlineLockClosed} from 'react-icons/hi'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <div className="icon-and-input-container">
          <HiOutlineUserCircle size="20" />
          <input
            type="text"
            id="username"
            className="input-field"
            onChange={this.onChangeUsername}
            value={username}
          />
        </div>
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <div className="icon-and-input-container">
          <HiOutlineLockClosed size="20" />
          <input
            type={inputType}
            id="password"
            className="input-field"
            onChange={this.onChangePassword}
            value={password}
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="check-box"
            onChange={this.onShowPassword}
            id="checkbox"
          />
          <label className="checkbox-label" htmlFor="checkbox">
            Show Password
          </label>
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg, password} = this.state
    const loginBtnClassName = password.trim() !== '' ? 'active-login-btn' : ''
    const token = Cookies.get('jwt_token')
     if (token !== undefined) {
      return <Redirect to="/" />
    } 

    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/demx1ym4x/image/upload/v1720351664/Logo_2_prtq9w.png"
            alt="login website logo"
            className="login-website-logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className={`login-btn ${loginBtnClassName}`}>
            Login
          </button>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
