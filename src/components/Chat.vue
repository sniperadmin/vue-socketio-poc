<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat Group</h3>
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
              <div class="gorm-group">
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
            socket: io('http://localhost:3001')
        }
    },
    mounted() {
        this.socket.on('MESSAGE', data => {
            this.messages = [...this.messages, data]
        })
    },
    methods: {
        sendMessage(e) {
            e.preventDefault()

            this.socket.emit('SEND_MESSAGE', {
                message: this.message
            })
            this.message.text = ''
        }
    }
}
</script>