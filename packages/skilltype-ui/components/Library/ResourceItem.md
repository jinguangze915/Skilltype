```js
initialState = {
  isSaved: false,
  infoIsVisible: false,
}
;<Section style={{ backgroundColor: 'white', maxWidth: '550px' }}>
  <ResourceItem
    resourceType={'video'}
    title={'Introduction to EBSCO Discovery Service'}
    publishedOn={'Yesterday'}
    source={'youtube.com'}
    url={'https://youtube.com/12345'}
  >
    <ResourceItemMenu
      onSaveClick={() => setState({ isSaved: !state.isSaved })}
      isSaved={state.isSaved}
      infoIsVisible={state.infoIsVisible}
      onInfoClick={() => setState({ infoIsVisible: !state.infoIsVisible })}
    />
  </ResourceItem>
</Section>
```
