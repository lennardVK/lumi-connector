<template>
  <div id="app">
    <div>To do: {{ taskClasses[0].toDo }}</div>
    <div>Doing: {{ taskClasses[1].doing }}</div>
    <div>Done: {{ taskClasses[2].done }}</div>
    <router-view />
  </div>
</template>

<script>
//import Trello from "trello";

/*
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCdcmJIJwAK2R_szOKq5wSZRMyHgmlDQB4",
    authDomain: "lumi-4cfbe.firebaseapp.com",
    databaseURL: "https://lumi-4cfbe.firebaseio.com",
    projectId: "lumi-4cfbe",
    storageBucket: "lumi-4cfbe.appspot.com",
    messagingSenderId: "734377005425",
    appId: "1:734377005425:web:86a220e5b0477e417326d0",
    measurementId: "G-E1QV7PG4D9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 */
import Vue from "vue";

import { vuexfireMutations } from "vuexfire";
import { db } from "./db";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  data() {
    return {
      data: Object,
      classes: ["toDo","doing","done"],
      taskClasses: [{ toDo: 1 }, { doing: 1 }, { done: 1 }],
    };
  },
  state: 0,

  mutations: vuexfireMutations,

  created() {
    //const documentId = "lumi-4cfbe"
    
    setInterval(() => {
      this.getData();
      if (
        this.taskClasses[0].toDo &&
        this.taskClasses[1].doing &&
        this.taskClasses[2].done
      ) {
      
        this.sendTasks(this.taskClasses[0].toDo,"toDo")
        this.sendTasks(this.taskClasses[1].doing,"doing")
        this.sendTasks(this.taskClasses[2].done,"done")
      }
    }, 3000);
  },
  methods: {


    sendTasks(tasks, name) {
      var toDoRef = db.collection("TaskClasses").doc(name);

        // Set the "capital" field of the city 'DC'
        return toDoRef
          .update({
            tasks: tasks,
          })
          .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
    },

    convertData() {
      if (this.data != undefined) {
        let cards = this.data.map((card) => {
          let listId = card.idList;
          return listId;
        });
        this.list = cards;
      }
    },
    setStates() {
      let toDo = this.list.filter((id) => id == "5e93f1619d3ddd839efd7857")
        .length;
      let doing = this.list.filter((id) => id == "5e93f1643458932cd6bae158")
        .length;
      let done = this.list.filter((id) => id == "5e93f1679030046a66c83cb1")
        .length;
      this.taskClasses[0].toDo = toDo;
      this.taskClasses[1].doing = doing;
      this.taskClasses[2].done = done;
      //console.log(this.taskClasses);
    },
    getData() {
      const fetch = require("node-fetch");
      fetch("https://api.trello.com/1/boards/5e93f15200669f33e504f331/cards", {
        method: "GET",
      })
        .then((response) => {
          //console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text(response);
        })
        .then((data) => {
          this.data = JSON.parse(data);

          this.convertData();
          this.setStates();
        })
        .catch((err) => console.error(err));
    },
  },
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
