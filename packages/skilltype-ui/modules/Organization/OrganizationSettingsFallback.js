import React from 'react'
import injectSheet, { withTheme } from 'react-jss'
import Progress from '../../components/Progress/Progress'
import RaisedSection from '../../components/Section/RaisedSection'
import Form from '../../components/Form/Form'
import TextField from '../../components/Form/Fields/TextField'
import ColorPickerField from '../../components/Form/Fields/ColorPickerField'
import ZipField from '../../components/Form/Fields/ZipField'
import SelectField from '../../components/Form/Fields/SelectField'
import SecondaryButton from '../../components/Button/SecondaryButton'
import SubmitButton from '../../components/Button/SubmitButton'
import styles from './styles'

const OrganizationSettingsFallback = ({ classes, theme }) => {
  const colors = Array(12).fill(theme.lightGrey)
  return (
    <React.Fragment>
      <RaisedSection title="Settings" contentPadding>
        <Progress />
        <Form id="" values={{}}>
          <TextField label="&nbsp;&nbsp;" placeholder="" disabled />
          <SelectField
            options={[]}
            label="&nbsp;&nbsp;"
            placeholder=""
            disabled
          />
          <TextField label="&nbsp;&nbsp;" placeholder="" disabled />
          <TextField label="&nbsp;&nbsp;" placeholder="" disabled />
          <ZipField label="&nbsp;&nbsp;" placeholder="" disabled />
          <ColorPickerField
            label="&nbsp;&nbsp;"
            placeholder=""
            disabled
            colors={colors}
          />
          <SubmitButton style={{ marginTop: '2em', marginBottom: '-2em' }}>
            Update
          </SubmitButton>
        </Form>
      </RaisedSection>

      <RaisedSection contentPadding style={{ lineHeight: '1' }}>
        <div className={classes.requestDeletion}>
          <div>
            <p className={classes.requestDeletionTitle}>
              Request Organization Deletion
            </p>
            <p>
              Once we process the deletion, it will be gone forever. Please be
              certain.
            </p>
          </div>
          <SecondaryButton className={classes.requestDeletionButton}>
            Request Delete
          </SecondaryButton>
        </div>
      </RaisedSection>
    </React.Fragment>
  )
}

export default injectSheet(styles)(withTheme(OrganizationSettingsFallback))
