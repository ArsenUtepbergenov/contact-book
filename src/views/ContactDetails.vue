// The contact details view

<template>
  <section v-if="isReady" class="contact-details">
    <div class="container">
      <div class="card">
        <div class="contact-details__avatar">
          <h2>{{contact.name}}</h2>
          <img :src="contact.avatar" :alt="contact.name">
        </div>
        <div class="contact-details__info">
          <p><b>Phone:</b> {{contact.phone}}</p>
          <p><b>Email:</b> {{contact.email}}</p>
          <p><b>About:</b> {{contact.about}}</p>
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
