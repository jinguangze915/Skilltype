```js
initialState = {
  '1': {},
  '2': {},
}
const Menu = ({ id }) => (
  <ResourceItemMenu
    onSaveClick={() =>
      setState({ [id]: { ...state[id], isSaved: !state[id].isSaved } })
    }
    onInfoClick={() =>
      setState({
        [id]: { ...state[id], infoIsVisible: !state[id].infoIsVisible },
      })
    }
    isSaved={state[id].isSaved}
    infoIsVisible={state[id].infoIsVisible}
  />
)
;<Section>
  <ResourceListHead resourceCount={410} />
  <ResourceList style={{ width: '550px' }}>
    <ResourceListItem>
      <ResourceItem
        resourceType={'video'}
        title={'Introduction to EBSCO Discovery Service'}
        publishedOn={'Yesterday'}
        source={'youtube.com'}
        url={'https://youtube.com/12345'}
      >
        <Menu id="1" />
      </ResourceItem>
      {state['1'].infoIsVisible && (
        <ResourceInfo>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ResourceInfo>
      )}
    </ResourceListItem>
    <ResourceListItem>
      <ResourceItem
        resourceType={'course'}
        title={'How to Measure Weeding Projects'}
        publishedOn={'6 years ago'}
        source={'librarycarpentry.org'}
        url={'https://librarycarpentry.org/12345'}
      >
        <Menu id="2" />
      </ResourceItem>
      {state['2'].infoIsVisible && (
        <ResourceInfo>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ResourceInfo>
      )}
    </ResourceListItem>
  </ResourceList>
</Section>
```
