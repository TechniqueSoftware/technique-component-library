import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Editor from '..'

const onChangeEditorState = jest.fn()
const onFocusHandler = jest.fn()

const props = {
  onChangeEditorState,
  onFocusHandler,
  textToAdd: '{UpdateText}',
  id: 'mock-wrapper',
  initValue: 'This is test',
  editorRef: {
    current: undefined
  }
}

describe('<Editor>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Editor id={props.id} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders editor with default value', () => {
    render(<Editor id={props.id} initValue={props.initValue} />)
    expect(screen.queryAllByText('This is test')).toHaveLength(2)
  })

  it('should insert text dynamically in the content', () => {
    render(<Editor {...props} />)
    expect(screen.queryAllByText('This is test')).toHaveLength(2)
    expect(screen.queryByText('{UpdateText}')).toBeInTheDocument()
  })

  it('should call onChangeEditorState when some text is inserted', () => {
    render(<Editor {...props} />)
    const textInputArea = screen.queryByText('{UpdateText}').parentNode.nextSibling
    userEvent.type(textInputArea, 't')
    expect(onChangeEditorState).toHaveBeenCalled()
  })

  it('should call onChangeEditorState when mouse click in textarea', () => {
    render(<Editor {...props} />)
    const textInputArea = screen.queryByText('{UpdateText}').parentNode.nextSibling
    userEvent.click(textInputArea)
    expect(onChangeEditorState).toHaveBeenCalled()
  })

  it('should open and close dropdown on option toolbar table option click', async () => {
    render(<Editor {...props} />)
    const tableButton = screen.getByLabelText('Table')
    userEvent.click(tableButton)
    expect(screen.queryByText('Insert table')).toBeInTheDocument()
    const alignButton = screen.getByLabelText('Align')
    userEvent.click(alignButton)
    expect(screen.queryByText('Align Left')).toBeInTheDocument()
  })

  it('should insert line ', async () => {
    render(<Editor {...props} />)
    const lineButton = screen.getByLabelText('Line')
    userEvent.click(lineButton)
    const textInputed = screen.queryAllByText('This is test')
    expect(textInputed[0].nextSibling.nextSibling.querySelector('hr')).toBeTruthy()
  })

  it('should open source and close ', async () => {
    const props1 = { ...props, id: 'test-modal' }
    render(<Editor {...props1} />)

    const htmlButton = screen.getByLabelText('HTML')
    userEvent.click(htmlButton)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(r => setTimeout(r, 500))
    expect(htmlButton).toHaveClass('redactor-button-active')
    userEvent.type(screen.getByLabelText('test-modal'), 't')
    userEvent.click(htmlButton)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(r => setTimeout(r, 500))
    expect(htmlButton).not.toHaveClass('redactor-button-active')
  })
})
