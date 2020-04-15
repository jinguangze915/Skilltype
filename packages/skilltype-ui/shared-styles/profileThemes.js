import defaultTheme from './theme'

export default (theme = defaultTheme) => {
  const hibiscus = {
    backgroundColor: theme.hibiscusBackground,
    color: theme.hibiscusColor,
  }
  const rain = {
    backgroundColor: theme.rainBackground,
    color: theme.rainColor,
  }
  const fog = {
    backgroundColor: theme.fogBackground,
    color: theme.fogColor,
  }
  const sunshine = {
    backgroundColor: theme.sunshineBackground,
    color: theme.sunshineColor,
  }
  const spearmint = {
    backgroundColor: theme.spearmintBackground,
    color: theme.spearmintColor,
  }
  const cinnamon = {
    backgroundColor: theme.cinnamonBackground,
    color: theme.cinnamonColor,
  }
  const midnight = {
    backgroundColor: theme.midnightBackground,
    color: theme.midnightColor,
  }
  const eggplant = {
    backgroundColor: theme.eggplantBackground,
    color: theme.eggplantColor,
  }
  const kumquat = {
    backgroundColor: theme.kumquatBackground,
    color: theme.kumquatColor,
  }
  const desert = {
    backgroundColor: theme.desertBackground,
    color: theme.desertColor,
  }
  const honey = {
    backgroundColor: theme.honeyBackground,
    color: theme.honeyColor,
  }
  const forest = {
    backgroundColor: theme.forestBackground,
    color: theme.forestColor,
  }
  const cabernet = {
    backgroundColor: theme.cabernetBackground,
    color: theme.cabernetColor,
  }
  const carolina = {
    backgroundColor: theme.carolinaBackground,
    color: theme.carolinaColor,
  }
  const smoke = {
    backgroundColor: theme.smokeBackground,
    color: theme.smokeColor,
  }
  const mocha = {
    backgroundColor: theme.mochaBackground,
    color: theme.mochaColor,
  }
  const white = {
    backgroundColor: theme.white,
    color: theme.black,
  }
  const all = {
    hibiscus,
    rain,
    fog,
    spearmint,
    cinnamon,
    sunshine,
    midnight,
    eggplant,
    kumquat,
    desert,
    honey,
    forest,
    cabernet,
    carolina,
    smoke,
    mocha,
    white,
  }

  const user = {
    hibiscus,
    rain,
    sunshine,
    fog,
  }

  const organization = {
    spearmint,
    cinnamon,
    midnight,
    eggplant,
    kumquat,
    desert,
    honey,
    forest,
    cabernet,
    carolina,
    smoke,
    mocha,
  }

  return {
    all,
    user,
    organization,
  }
}
