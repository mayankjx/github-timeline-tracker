<template>
  <transition-group
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__slideOutUp"
  >
    <div v-if="requested || failed" class="search">
      <button
        @click="toggleSearchPublic"
        class="publicSearchBtn"
        :class="{ active: searchPublic, inactive: searchRepo }"
      >
        Search public events
      </button>
      <button
        @click="toggleSearchRepo"
        class="repoSearchBtn"
        :class="{ active: searchRepo, inactive: searchPublic }"
      >
        Search by repo
      </button>
      <div class="inputContainer">
        <transition name="slide-right" mode="out-in">
          <div v-if="searchPublic" class="event">
            <input
              type="text"
              placeholder="Enter username"
              v-model="username"
            />
            <button @click="searchPublicEvent">Search</button>
          </div>
        </transition>
        <transition name="slide-left" mode="out-in">
          <div v-if="searchRepo" class="repo">
            <input
              type="text"
              placeholder="Enter username"
              v-model="username"
            />
            <h1>/</h1>
            <input
              type="text"
              placeholder="Enter repository"
              v-model="repoName"
            />
            <button @click="searchRepoEvent">Search</button>
          </div>
        </transition>
      </div>
    </div>
  </transition-group>
  <transition
    enter-active-class="animate__animated animate__bounceIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="failed" class="error">
      <img src="@/assets/warning.png" alt="error" class="errorIcon" />
      <p class="err-msg">Error: {{ errMsg }}</p>
      <img
        src="@/assets/close(1).png"
        alt="close"
        class="closeBtn"
        @click="reqStatus"
      />
    </div>
  </transition>

  <transition-group
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div v-if="fetched" class="timeline-section">
      <h2 style="font-weight: 400, font-size : 30px">Here is the timeline</h2>
      <button @click="back" class="backBtn">Go back</button>
      <transition-group
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div v-for="event in eventList" :key="event.id" class="timeline-body">
          <div class="timeline-item">
            <p class="time">{{ event.created_at }}</p>
            <div class="content">
              <h2 class="title">{{ event.type }}</h2>
              <p class="detail">
                {{ "On repo: " + event.repo.name }}
              </p>
              <div
                v-for="commit in event.payload.commits"
                :key="commit.sha"
                class="commitList"
              >
                <div class="commit">
                  <p class="author">Author: {{ commit.author.name }}</p>
                  <p class="commit_msg">Commit message: {{ commit.message }}</p>
                </div>
              </div>
              <div v-if="event.payload.description" class="create">
                <p class="repoName">Respository Name: {{ event.repo.name }}</p>
                <p class="description">
                  About: {{ event.payload.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      searchPublic: true,
      searchRepo: false,
      username: null,
      repoName: null,
    };
  },
  methods: {
    toggleSearchPublic() {
      this.searchPublic = true;
      this.searchRepo = false;
    },
    toggleSearchRepo() {
      this.searchPublic = false;
      this.searchRepo = true;
    },

    searchPublicEvent() {
      this.$store.dispatch("getPublicData", { username: this.username });
    },

    searchRepoEvent() {
      this.$store.dispatch("getRepoData", {
        username: this.username,
        repo: this.repoName,
      });
    },

    back() {
      this.$store.commit("setStatus", "requested");
    },

    reqStatus() {
      this.$store.commit("setStatus", "requested");
      this.username = "";
      this.repoName = "";
    },
  },
  computed: {
    requested() {
      if (this.$store.state.status === "requested") {
        return true;
      }
    },

    fetching() {
      if (this.$store.state.status === "loading") {
        return true;
      }
    },

    fetched() {
      if (this.$store.state.status === "fetched") {
        return true;
      }
    },

    failed() {
      if (this.$store.state.status === "failed") {
        return true;
      }
    },

    errMsg() {
      return this.$store.state.error;
    },

    eventList() {
      return this.$store.state.events;
    },
  },
};
</script>

<style>
/* ANIMATIONS */

.slide-right-enter-from {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: 1s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: 1s ease;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

/* STYLES */

.loading {
  margin-top: 250px;
  font-size: 30px;
  font-weight: 600;
  font-family: "Roboto Mono", monospace;
}

.inputContainer {
  position: relative;
}

.search {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 30px 50px;
  text-align: right;
  font-family: "Roboto Mono", monospace;
}

.event {
  width: 100%;
  position: absolute;
}

.repo {
  width: 100%;
  position: absolute;
}

.repo button {
  background: none;
  color: #fff;
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
}

.search .publicSearchBtn {
  background: none;
  color: #fff;
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
}

.search .repoSearchBtn {
  background: none;
  color: #fff;
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
}

.active {
  border: none;
  border-bottom: 2px solid #fff;
  opacity: 1;
}

.inactive {
  border: none;
}

.search .publicSearchBtn {
  margin-right: 35px;
}

.event {
  text-align: center;
  margin-top: 13%;
}

.event button {
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  font-size: 25px;
  padding: 10px 25px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
}

.repo {
  text-align: center;
  margin-top: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.repo h1 {
  margin-right: 40px;
  font-size: 60px;
  opacity: 0.5;
  font-weight: 400;
}

.repo button {
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  font-size: 25px;
}

input {
  font-size: 30px;
  background: none;
  border: none;
  color: #fff;
  font-style: italic;
  border-bottom: 3px solid #fff;
  padding: 10px 25px;
  width: 30%;
  margin-right: 50px;
}

textarea:focus,
input:focus {
  outline: none;
}

.timeline-section p {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
  line-height: 1.5;
}

.timeline-section {
  position: relative;
  padding: 20px 50px;
  margin-top: 30px;
}

.timeline-section .backBtn {
  position: absolute;
  top: 10px;
  right: 200px;
  border: none;
  background-color: #fff;
  color: #222;
  font-family: "Roboto Mono", monospace;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.timeline-body {
  text-align: left;
  position: relative;

  margin-left: 100px;
  border-radius: 0 8px 8px 0;
  padding: 5px 0;
}

.timeline-body::after {
  content: "";
  width: 4px;
  height: 100%;
  background-color: #4298c3;
  position: absolute;
  left: -4px;
  top: 0;
}

.timeline-item {
  position: relative;
  background: #444;
  padding-top: 5px;
  margin-top: 40px;
}

.timeline-item::after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #4298c3;
  background-color: #444;
  position: absolute;
  left: -16px;
  top: 6px;
  z-index: 9;
}

.timeline-item .time {
  position: absolute;
  left: -115px;
  top: 10px;
  opacity: 0.7;
  font-size: 15px;
}

.timeline-item .content {
  margin: 20px 30px;
  padding-bottom: 20px;
}

.timeline-item .content .title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

.timeline-item .content .create {
  margin-top: 10px;
  background-color: #555;
  padding: 10px 15px;
  border-radius: 15px;
  width: 50%;
}

.timeline-item .content .create p {
  opacity: 1;
  color: lightskyblue;
}

.timeline-item .content .create .repoName {
  font-weight: bold;
}

.timeline-item .commitList {
  margin-top: 10px;
  background-color: #555;
  padding: 10px 15px;
  border-radius: 15px;
  width: 50%;
}

.timeline-item .commitList p {
  color: lightsalmon;
  opacity: 1;
}

.timeline-item .commitList .author {
  font-weight: bold;
}

.error {
  position: absolute;
  top: 105px;
  margin-left: 140px;
  text-align: center;
  background-color: #fff;
  color: #222;
  width: 30%;
  padding: 20px 20px;
  border-radius: 10px;
}

.error .errorIcon {
  position: absolute;
  height: 40px;
  left: 30px;
  top: 10px;
}

.error .closeBtn {
  position: absolute;
  top: 23px;
  right: 30px;
  height: 20px;
  cursor: pointer;
}
</style>
