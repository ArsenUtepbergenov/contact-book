<template>
  <section class="home">
    <Modal v-if="showModal" @close="toggleModal">
      <template #body>
        <CreateUpdateForm
          @submit="newData => createContact(newData)"
          textSubmitButton="Create contact" />
      </template>
    </Modal>
    <div class="container">
      <div class="contacts-controls">
        <button type="button" class="contacts-controls__btn-add-new" @click="toggleModal">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
      <h3 class="text">
        List of your contacts:
      </h3>
      <div v-for="contact in contacts" :key="contact.id">
        <Card :data="contact" />
      </div>
    </div>
  </section>
</template>

<script>
import { fetchContacts, createContact } from '../api/contact-book'
import Card from '../components/Card'
import Modal from '../components/Modal'
import CreateUpdateForm from '../components/CreateUpdateForm'

export default {
  name: 'Home',
  data () {
    return {
      contacts: [],
      showModal: false
    }
  },
  async created () {
    this.contacts = await fetchContacts()
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    },
    createContact (newData) {
      createContact(newData)
    }
  },
  components: {
    Card,
    Modal,
    CreateUpdateForm
  }
}
</script>
