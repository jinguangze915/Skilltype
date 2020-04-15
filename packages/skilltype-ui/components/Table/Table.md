```js
const Select = require('../Select/Select').default;
const roleOptions = [
 { label: 'Admin' , value: 'admin'},
 { label: 'Member' , value: 'member'},
 { label: 'Follower' , value: 'follower'},
 { label: 'Alumni' , value: 'alumni'},
];
const data = [
  ['Steve Bowers', 'member', 'Pending'],
  ['Jon Cawthorne', 'admin', 'Active'],
  ['Tony Zanders', 'follower', ''],
  ['Andrea Steckle', 'alumni', 'Inactive']
];
const dataLong = [
  ['Steve Bowers', 'member', 'Pending'],
  ['Jon Cawthorne', 'admin', 'Active'],
  ['Tony Zanders', 'follower', ''],
  ['Andrea Steckle', 'alumni', 'Inactive'],
  ['Steve Bowers', 'member', 'Pending'],
  ['Jon Cawthorne', 'admin', 'Active'],
  ['Tony Zanders', 'follower', ''],
  ['Andrea Steckle', 'alumni', 'Inactive'],
  ['Steve Bowers', 'member', 'Pending'],
  ['Jon Cawthorne', 'admin', 'Active'],
  ['Tony Zanders', 'follower', ''],
  ['Andrea Steckle', 'alumni', 'Inactive']
];
<React.Fragment>
  <RaisedSection title='Title of this table'>
    <Table
      data={data}
      columns={[
        { name: 'Name'},
        {
          name: 'Role',
          options: {
            customBodyRender: (value, updateValue, row, column) => {
              return (
                <Select
                  id='role'
                  key={`${row}-${column}`}
                  clearable={false}
                  placeholder=""
                  options={roleOptions}
                  value={value}
                  onChange={(event) => updateValue(event.target.value)}
                  style={{
                    fontSize: 'initial',
                    marginBottom: '-0.3em',
                  }}
                  inputProps={{
                    menuPortalTarget: document.getElementById('root')
                  }}
                />
              )
            }
          }
        },
        {
          name: 'Status',
          options: {
            customBodyRender: (value) => {
              const colorMapping = {
                active: '#56b67d',
                inactive: '#d32f2f',
                pending: '#F7C332',
              }
              const black = '#000000'
              const color = colorMapping[value.toLowerCase()] || black
              return (
                <div style={{ color }}>
                  {value}
                </div>
              )
            }
          }
        },
      ]}
    />
  </RaisedSection>
  <RaisedSection title='Overflow After Max Height of Parent'>
    <Table
      data={dataLong}
      columns={[
        { name: 'Name'},
        {
          name: 'Role',
          options: {
            customBodyRender: (value, updateValue, row, column) => {
              return (
                <Select
                  id='role'
                  key={`${row}-${column}`}
                  clearable={false}
                  placeholder=""
                  options={roleOptions}
                  value={value}
                  onChange={(event) => updateValue(event.target.value)}
                  style={{
                    fontSize: 'initial',
                    marginBottom: '-0.3em',
                  }}
                  inputProps={{
                    menuPortalTarget: document.getElementById('root')
                  }}
                />
              )
            }
          }
        },
        {
          name: 'Status',
          options: {
            customBodyRender: (value) => {
              const colorMapping = {
                active: '#56b67d',
                inactive: '#d32f2f',
                pending: '#F7C332',
              }
              const black = '#000000'
              const color = colorMapping[value.toLowerCase()] || black
              return (
                <div style={{ color }}>
                  {value}
                </div>
              )
            }
          }
        },
      ]}
      />
  </RaisedSection>
</React.Fragment>
```
