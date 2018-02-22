import React, {Component, PropTypes} from 'react'
import onClickOutside from 'react-onclickoutside'

class AnnotationInput extends Component {
  state = {
    isEditing: false,
  }

  handleInputClick = () => {
    this.setState({isEditing: true})
  }

  handleKeyDown = e => {
    const {onConfirmUpdate, onRejectUpdate} = this.props

    if (e.key === 'Enter') {
      onConfirmUpdate()
      this.setState({isEditing: false})
    }
    if (e.key === 'Escape') {
      onRejectUpdate()
      this.setState({isEditing: false})
    }
  }

  handleFocus = e => {
    e.target.select()
  }

  handleChange = e => {
    this.props.onChangeInput(e.target.value)
  }

  handleClickOutside = () => {
    if (!this.state.isEditing) {
      return
    }
    this.props.onRejectUpdate()
    this.setState({isEditing: false})
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.onConfirmUpdate()
    this.setState({isEditing: false})
  }

  handleFormCancel = () => {
    this.props.onRejectUpdate()
    this.setState({isEditing: false})
  }

  render() {
    const {isEditing} = this.state
    const {value} = this.props

    return (
      <div className="annotation-tooltip--input-container">
        {isEditing
          ? <form
              onSubmit={this.handleFormSubmit}
              className="annotation-tooltip--form"
            >
              <input
                type="text"
                className="annotation-tooltip--input form-control input-xs"
                value={value}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                autoFocus={true}
                onFocus={this.handleFocus}
              />
              <button
                className="annotation-tooltip--input-button btn btn-square btn-xs btn-default"
                type="button"
                onClick={this.handleClickOutside}
              >
                <span className="icon remove" />
              </button>
              <button
                className="annotation-tooltip--input-button btn btn-square btn-xs btn-success"
                type="submit"
              >
                <span className="icon checkmark" />
              </button>
            </form>
          : <div className="input-cte" onClick={this.handleInputClick}>
              {value}
              <span className="icon pencil" />
            </div>}
      </div>
    )
  }
}

const {func, string} = PropTypes

AnnotationInput.propTypes = {
  value: string,
  onChangeInput: func.isRequired,
  onConfirmUpdate: func.isRequired,
  onRejectUpdate: func.isRequired,
}

export default onClickOutside(AnnotationInput)
