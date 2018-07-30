<template>
  <div id="app">
    <Header></Header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Header from 'components/header/header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  name: 'app',
  components: {
    Header,
    Tab,
    Player
  }
}
</script>
