// The contact details view

<template>
  <section v-if="isReady" class="contact-details">
    <div class="container">
      <div class="column">
        <button type="button" class="btn btn-back" @click="() => this.$router.go('-1')">
          <i class="fas fa-arrow-circle-left fa-3x"></i>
        </button>
        <div class="contact-details__content box">
          <div class="contact-details__avatar">
            <h2>{{contact.name}}</h2>
            <img v-if="contact.avatar" :src="contact.avatar" :alt="contact.name">
            <img v-else src="https://via.placeholder.com/720?text=Avatar" :alt="contact.name">
          </div>
          <div class="contact-details__info">
            <p><b>Phone:</b> {{contact.phone}}</p>
            <p><b>Email:</b> {{contact.email}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchContact } from '../api/contact-book'

export default {
  name: 'contact-details',
  data () {
    return {
      contactId: '',
      contact: null,
      isReady: false
    }
  },
  async created () {
    this.contactId = this.$route.params.id
    this.contact = await fetchContact(this.contactId)
    this.isReady = true
  },
  methods: {
    updateBook () {
    }
  }
}
</script>
