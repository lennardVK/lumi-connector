<template>
  <div id="app">
    <div>To do: {{ toDo }}</div>
    <div>Doing: {{ doing }}</div>
    <div>Done: {{ done }}</div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: Object,
      lists: [],
      toDo: 0,
      doing: 0,
      done: 0
    };
  },
  created() {
    setInterval(() => {
      this.getData();
    }, 1000);
  },
  methods: {
    convertData() {
      if (this.data != undefined) {
        let cards = this.data.map(card => {
          let listId = card.idList;
          return listId;
        });
        this.list = cards;
      }
    },

    setStates() {
      let toDo = this.list.filter(id => id == "5e93f1619d3ddd839efd7857")
        .length;
      let doing = this.list.filter(id => id == "5e93f1643458932cd6bae158")
        .length;
      let done = this.list.filter(id => id == "5e93f1679030046a66c83cb1")
        .length;

      this.toDo = toDo;
      this.doing = doing;
      this.done = done;

      /* console.log(
        "To do: ",
        this.toDo,
        "doing: ",
        this.doing,
        "done: ",
        this.done
      );*/
    },

    getData() {
      const fetch = require("node-fetch"); // key=e0bb68c2d5670dfd4e12f6b8717522eb&token=3d4f06e55cba12ccaeb5d5698c4613858ba7783c540f0e1d084b3e348063749a
      fetch("https://api.trello.com/1/boards/5e93f15200669f33e504f331/cards", {
        method: "GET"
      })
        .then(response => {
          console.log(`Response: ${response.status} ${response.statusText}`);

          return response.text(response);
        })
        .then(data => {
          this.data = JSON.parse(data);
          console.log(this.data);
          this.convertData();
          this.setStates();
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
