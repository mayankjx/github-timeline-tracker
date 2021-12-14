<template>
  <div class="home">
    <div class="content">
      <p class="heading">Spy on anyone's timeline</p>
      <p class="point">- Track anyones's public activities by username</p>
      <p class="point">
        - Track anyone's repository activitites by repository name
      </p>
      <button @click="goToTimeline">Start Tracking</button>
    </div>
    <div class="screenshot">
      <img src="@/assets/ss-01.png" alt="screenshot" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  methods: {
    goToTimeline() {
      this.$router.push("/timeline");
    },
  },
};
</script>

<style scoped>
.home {
  position: absolute;
  width: 100%;
  font-family: "Roboto Mono", monospace;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 90px;
  margin-top: 100px;
}

.home .content {
  text-align: left;
  margin: 0px 10px;
}

.home .content .heading {
  font-size: 60px;
  font-weight: 600;
  letter-spacing: -0.5;
  word-spacing: -20px;
  margin-bottom: 30px;
  line-height: 70px;
}

.home .content .point {
  margin: 10px 0px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.7;
  word-spacing: -2px;
}

.home .content button {
  font-size: 20px;
  font-family: "Roboto Mono", monospace;
  font-weight: 700;
  cursor: pointer;
  color: #222;
  background-color: #fff;
  border: none;
  padding: 15px 20px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.home .screenshot {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 30px;
  overflow: hidden;
}

.home .screenshot img {
  text-align: center;
  border-radius: 20px;
  height: 400px;
}
</style>
