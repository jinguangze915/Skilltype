import React, { Component } from 'react'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import SectionHeading from '@skilltype/ui/components/Heading/SectionHeading'
import FileInput from '@skilltype/ui/components/TextInput/FileInput'
import injectSheet from 'react-jss'
import styles from './styles'

class AddResourceForm extends Component {
  state = {
    file: null,
    result: null,
  }

  handleFileChange = e => {
    const file = e.target.files[0]
    this.setState({ file })
  }

  removeFile = () => {
    document.getElementById('items-csv').value = null
    this.setState({
      file: null,
    })
  }

  uploadFile = () => {
    const { file } = this.state
    const data = new FormData()
    data.append('file', file)

    this.props.serviceContext.resource
      .bulkInsertResource(data)
      .then(res => {
        this.setState({
          result: res,
        })
        this.props.notify('The Items Successfully Updated')
        this.props.notifyClose(2000)
      })
      .catch(() => {
        this.props.notifyError('Error Importing Items')
        this.props.notifyClose(2000)
      })
  }

  render() {
    const { classes } = this.props
    const { file, result } = this.state

    return (
      <React.Fragment>
        <SectionHeading className={classes.sectionHeader}>
          <div className={classes.title}>Add Items</div>
          <a
            href="https://uploads-ssl.webflow.com/5d73005a34bd367a51de8161/5df6f4e2b0ebe75c4f4ad7bf_resource-feed-items.csv"
            className={classes.btnPrimary}
          >
            Download CSV Template
          </a>
        </SectionHeading>

        <div className={classes.uploadItemsSection}>
          <FileInput
            id="items-csv"
            file={file}
            onChange={this.handleFileChange}
            acceptedFiles=".csv"
          />
          {file && (
            <div className={classes.uploadedAction}>
              <button className={classes.btnPrimary} onClick={this.uploadFile}>
                Import
              </button>
              <span>·</span>
              <button className={classes.btnDanger} onClick={this.removeFile}>
                Delete
              </button>
            </div>
          )}
        </div>
        {result && (
          <div className={classes.sectionFooter}>
            <p>
              {`${result.success} resource${
                result.success > 1 ? 's' : ''
              } successfully imported.`}
              {result.errorLines.length > 0 &&
                `${result.errorLines.length} resource${
                  result.errorLines.length > 1 ? 's were' : ' was'
                } unsuccessful.`}
            </p>
            {result.errorLines.length > 0 && (
              <p>
                {`Review row${
                  result.errorLines.length > 1 ? 's' : ''
                } ${result.errorLines.join(', ')} for error${
                  result.errorLines.length > 1 ? 's' : ''
                }.`}
              </p>
            )}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(
  withServiceContext(withNotifyContext(AddResourceForm))
)
