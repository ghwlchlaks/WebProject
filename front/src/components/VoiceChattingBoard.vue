<template>
<v-app>
  <v-content>
    <input type="text" id="txt-roomid" placeholder="unique room id">
    <!-- <button id="btn-open-or-join-room">open or join room</button> -->
    <!-- <div id="local-video-container"></div>
    <div id="remote-video-container"></div> -->
    <hr>

      <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-btn id='btn-open-or-join-room' color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div id='audios-container'>
          <div id="local-video-container"></div>
          <div id="remote-video-container"></div>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>


  </v-content>
</v-app>
</template>
<script src="https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js"></script>
<script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js"></script>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  mounted () {
    var roomid = document.getElementById('txt-roomid')
    roomid.value = (Math.random() * 1000).toString().replace('.', '')
    var connection = new RTCMultiConnection()
    connection.socketURL = 'http://localhost:443/'
    connection.session = {
      audio: true,
      video: false
    }
    connection.mediaConstraints = {
    audio: true,
    video: false
    }
    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: false
    }
    
    connection.audiosContainer = document.getElementById('audios-container')
    var localVideoContainer = document.getElementById('local-video-container')
    var remoteVideoContainer = document.getElementById('remote-video-container')
    connection.onstream = function (event) {
      var video = event.mediaElement
      if (event.type === 'local') {
        localVideoContainer.appendChild(video)
      }
      if (event.type === 'remote') {
        remoteVideoContainer.appendChild(video)
      }
      var mediaElement = getHTMLMediaElement(video, {
        buttons: ['full-screen'],
        title: event.userid
      })
      connection.audiosContainer.appendChild(mediaElement)
      mediaElement.id = event.streamid
    }
connection.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
    }
};

    document.getElementById('btn-open-or-join-room').onclick = function () {
      this.disabled = true
      connection.openOrJoin(roomid.value || 'predefiend-roomid')
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
