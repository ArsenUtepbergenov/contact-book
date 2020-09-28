<template>
  <section class="contacts">
    <Modal v-if="showModal" @close="toggleModal">
      <template #body>
        <CreateForm
          @submit="newData => createContact(newData)"
          textSubmitButton="Create contact" />
      </template>
    </Modal>
    <div class="column">
      <div class="contacts-controls">
        <button type="button" class="contacts-controls__btn-add-new" @click="toggleModal">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
      <h3 class="text">
        List of your contacts:
      </h3>
      <div class="row">
        <div v-for="contact in contacts" :key="contact.id">
          <Card :data="contact" @deleteContact="deleteContact" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchContacts, createContact } from '../api/contact-book'
import Card from '../components/Card'
import Modal from '../components/Modal'
import CreateForm from '../components/CreateForm'

export default {
  name: 'Contacts',
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
    async createContact (newData) {
      const newId = await createContact(newData)
      this.contacts.unshift({ ...newData, id: newId })
    },
    deleteContact (id) {
      const index = this.contacts.findIndex(contact => contact.id === id)
      this.contacts.splice(index, 1)
    }
  },
  components: {
    Card,
    Modal,
    CreateForm
  }
}
</script>
