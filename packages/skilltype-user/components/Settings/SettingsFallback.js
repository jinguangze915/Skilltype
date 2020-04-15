import React from 'react'
import { withTheme } from 'react-jss'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Content from '@skilltype/ui/components/Viewport/Content'
import FormSection from '@skilltype/ui/components/Section/FormSection'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import ColorPicker from '@skilltype/ui/components/ColorPicker/ColorPicker'
import SelectField from '@skilltype/ui/components/Form/Fields/SelectField'

// &nbps;nbps; is a trick with escape characters to get React to render a line of invisible text
const SettingsFallback = ({ theme }) => (
  <Content>
    <Progress />
    <FormSection>
      <TextField label="&nbsp;&nbsp;" placeholder=" " disabled />
      <TextField label="&nbsp;&nbsp;" placeholder=" " disabled />
      <EmailField label="&nbsp;&nbsp;" placeholder=" " disabled />
      <TextField label="&nbsp;&nbsp;" placeholder=" " disabled />
    </FormSection>
    <FormSection>
      <TextField label="&nbsp;&nbsp;" placeholder=" " disabled />
      <TextField label="&nbsp;&nbsp;" placeholder=" " disabled />
      <ColorPicker
        label="&nbsp;&nbsp;"
        placeholder=" "
        disabled
        colors={[
          theme.lightGrey,
          theme.lightGrey,
          theme.lightGrey,
          theme.lightGrey,
        ]}
      />
    </FormSection>
    <FormSection>
      <SelectField
        id=""
        label="&nbsp;&nbsp;"
        placeholder=" "
        options={[]}
        disabled
      />
      <SelectField
        id=""
        label="&nbsp;&nbsp;"
        placeholder=" "
        options={[]}
        disabled
      />
      <SelectField
        id=""
        label="&nbsp;&nbsp;"
        placeholder=" "
        options={[]}
        disabled
      />
      <SelectField
        id=""
        label="&nbsp;&nbsp;"
        placeholder=" "
        options={[]}
        disabled
      />
      <SelectField
        id=""
        label="&nbsp;&nbsp;"
        placeholder=" "
        options={[]}
        disabled
      />
    </FormSection>
  </Content>
)

export default withTheme(SettingsFallback)
