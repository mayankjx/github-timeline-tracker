<template>
  <div id="nav">
    <div class="logo">
      <p class="text">Github Tracker</p>
      <img src="@/assets/timeline.png" alt="logo" />
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/timeline">Tracker</router-link>
    </div>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition
      :enter-active-class="route.meta.enterClass"
      :leave-active-class="route.meta.leaveClass"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}

#nav {
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  padding: 30px 100px;
  border-bottom: 1px solid lightgray;
}

#nav .logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav .logo p {
  font-size: 20px;
  font-weight: 700;
}

#nav .logo img {
  margin-left: 20px;
  height: 50px;
}

#nav a {
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  opacity: 0.8;
  text-decoration: none;
  margin: 0 50px;
}

#nav a.router-link-exact-active {
  font-weight: 500;
  color: #fff;
  opacity: 1;
}
</style>
