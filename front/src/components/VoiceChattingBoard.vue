<template>
<v-app>
  <v-content>
     <b-table id='dataTable' hover outlined :items="items" @row-clicked="rowClick"></b-table>
    <b-pagination-nav class='pagination' :number-of-pages=total_pages_number :link-gen="linkGen" v-model="currentPage"></b-pagination-nav><br /><br />
    <v-btn id='addBtn' dark @click="AddContents()">Create Room</v-btn>

    <v-dialog v-model="isCreateRoom" max-width="350px">
      <v-card>
        <create-audio-room />
      </v-card>
    </v-dialog>

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
            <v-btn id='room_exit' dark flat>Save</v-btn>
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
import CreateAudioRoom from './CreateAudioRoom.vue'
import VoiceService from '@/services/VoiceService'

/* eslint-disable */
export default {
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      isCreateRoom: false,
      board_name: null,
      currentPage: 1,
      baseurl: null,
      items: [{}],
      roomid: [{}],
      total_pages_number: 0,
      boardId: 'voice',
    }
  },
  mounted () {
    this.getData(this.boardId, 1)
    this.initialize(this.boardId)
    this.total_page(this.boardId)
  },
  methods: {
    // get total page number
    async total_page (boardId) {
      const response = await VoiceService.totalPages(boardId)
      if (response.data.success === true) {
        this.total_pages_number = Math.ceil(response.data.message / 10)
      }
    },
    AddContents () {
      if (!this.$store.state.isUserLoggedin) {
        alert('로그인후 이용가능합니다.')
        this.$router.push('/')
        return
      }
      this.isCreateRoom = !this.isCreateRoom
    },
    // event handler when table rowcliked
    rowClick (record, index) {
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
    var room_exit = document.getElementById('room_exit')
    var userEmail = this.$store.state.user.email

    connection.onstream = function (event) {
      var video = event.mediaElement
      var userId = document.createElement('h2')
      userId.id = event.streamid + '-id' // create h2(user id) id
      var userText = document.createTextNode(userEmail)
      userId.appendChild(userText) 

      if (event.type === 'local') {
        localVideoContainer.appendChild(userId)
        localVideoContainer.appendChild(video)
      }
      if (event.type === 'remote') {
        remoteVideoContainer.appendChild(userId)
        remoteVideoContainer.appendChild(video)
      }
    }
    room_exit.onclick =function() {
      connection.disconnect()
      window.location.reload()
    }
    connection.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    var userIdElement = document.getElementById(event.streamid + '-id');
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
        userIdElement.parentNode.removeChild(userIdElement);
      }
    };
      console.log(this.roomid[index].roomid)
      var roomid_int =parseInt(this.roomid[index].roomid)
      this.dialog = !this.dialog
      document.getElementById('btn-open-or-join-room').onclick = function () {
      this.disabled = true
      
      connection.openOrJoin(roomid_int|| 'predefiend-roomid')
    }
    document.getElementById('btn-open-or-join-room').click()
    },
    // table pagination button click event
    linkGen (pageNum) {
      return '/' + this.baseurl + '/' + pageNum
    },
    // board initialize
    initialize (boardId) {
      this.board_name = boardId
      this.baseurl = '#/chatting/' + boardId
      this.currentPage = 1
      this.linkGen(1)
    },
    async getData (boardId, index) {
      const voiceData = await VoiceService.show(boardId, index)
      var indexBoardId = boardId + '_id'
      var changedData = [{}]
      var changedRoomid = [{}]
      for (var i = 0; i < voiceData.data.length; i++) {
        // var jsonString = JSON.stringify(boardData.data[i])  to string from json
        // var json = JSON.parse(jsonString)  to json from string
        changedData[i] = {
          // 'boardId'_id index access
          'INDEX': voiceData.data[i][indexBoardId],
          'Room Name': voiceData.data[i].roomName,
          'ADMIN': 'choi'
        }
        changedRoomid[i] = {
          'roomid': voiceData.data[i].roomid
        }
      }
      this.items = changedData
      this.roomid = changedRoomid
    }
  },
  components: {CreateAudioRoom}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#addBtn {
  width: 30%;
  margin-left: 35%;
}
.pagination {
  margin-left: 45%
}
</style>
