<template>
  <div class="card mt-3">
      <div v-if="!showBoard" class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="form-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="message.user" class="form-control">
              </div>
              <button @click="joinRoom('general')" type="submit" class="btn btn-success">Join chat</button>
          </form>
      </div>

      <section v-if="showBoard">

        <div class="card-body">
          <div class="card-title">
              <h3>{{ room ? room : 'Chat App' }}</h3>
              <hr>
          </div>
          <div class="card-body">
              <div
                v-for="m in messages"
                :key="m.user"
                class="messages"
            >
                {{ m.message.text }}
              </div>
          </div>
        </div>
        <div class="card-footer">
            <form @submit.prevent="sendMessage">
                <div class="form-group">
                    <label for="user">User:</label>
                    <input type="text" v-model="message.user" class="form-control">
                </div>
                <div class="gorm-group pb-3">
                    <label for="message">Message:</label>
                    <input type="text" v-model="message.text" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
            

        <div class="card">
            <div class="card-title">Rooms</div>
            <div class="card-body">
                <div @click="joinRoom('general')" class="gtitle">
                    <p>
                        general
                    </p>
                </div>
                <div @click="joinRoom('men')" class="gtitle">
                    <p>
                        men
                    </p>
                </div>
            </div>
        </div>
      </section>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'Chat',
    data() {
        return {
            message: {
                user: '',
                text: ''
            },
            messages: [],
            socket: io('http://localhost:3001'),
            room: '',
            showBoard: false,
        }
    },
    mounted() {
        // this.joinRoom('general')
        this.socket.on('MESSAGE', data => {
            this.messages = [...this.messages, data]
        })
        this.socket.on('update', data => {
            console.log(data.message)
        })
    },
    methods: {
        sendMessage(e) {
            e.preventDefault()

            this.socket.emit('SEND_MESSAGE', {
                message: this.message
            }, this.room)
            this.message.text = ''
        },
        joinRoom(roomName) {
            this.showBoard = true
            this.messages = []
            if (this.room != '') {
                this.socket.emit('LEAVE_ROOM', this.room)
            }

            this.socket.emit('JOIN_ROOM', roomName)
            this.room = roomName
        }
    }
}
</script>